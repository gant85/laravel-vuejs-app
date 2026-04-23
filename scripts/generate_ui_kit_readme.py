#!/usr/bin/env python3
"""Generate libs/ui-kit/README.md from source files.

This script documents:
- package usage and quick setup
- every exported Vue component
- props, defaults, slots, and usage examples
- exported type aliases and enums
"""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


REPO_ROOT = Path(__file__).resolve().parents[1]
UI_KIT_DIR = REPO_ROOT / "libs" / "ui-kit"
INDEX_FILE = UI_KIT_DIR / "src" / "index.ts"
TYPES_FILE = UI_KIT_DIR / "src" / "types.ts"
README_FILE = UI_KIT_DIR / "README.md"


@dataclass
class PropDoc:
    name: str
    type_text: str
    required: bool
    default: str
    description: str


@dataclass
class ComponentDoc:
    name: str
    file_name: str
    description: str
    props: list[PropDoc]
    slots: list[str]
    attrs_passthrough: bool


COMPONENT_EXAMPLES: dict[str, str] = {
    "Badge": """<template>
  <Badge content="7">
    <v-icon>mdi-bell</v-icon>
  </Badge>
</template>

<script setup lang=\"ts\">
import { Badge } from '@reference-app-laravel-vue/ui-kit';
</script>
""",
    "Button": """<template>
  <Button color="primary" size="large" variant="flat">Save changes</Button>
</template>

<script setup lang=\"ts\">
import { Button } from '@reference-app-laravel-vue/ui-kit';
</script>
""",
    "DatePicker": """<template>
  <DatePicker v-model="birthday" label="Birthday" />
</template>

<script setup lang=\"ts\">
import { ref } from 'vue';
import { DatePicker } from '@reference-app-laravel-vue/ui-kit';

const birthday = ref('');
</script>
""",
    "Divider": """<template>
  <Divider indent="middle-inset" subheader="Patient details" />
</template>

<script setup lang=\"ts\">
import { Divider } from '@reference-app-laravel-vue/ui-kit';
</script>
""",
    "Label": """<template>
  <Label color="success" appearance="tint" size="large" icon="mdi-check-circle">
    Confirmed
  </Label>
</template>

<script setup lang=\"ts\">
import { Label } from '@reference-app-laravel-vue/ui-kit';
</script>
""",
    "MessageBar": """<template>
  <MessageBar type="warning" title="Network warning" text="Connection is unstable." />
</template>

<script setup lang=\"ts\">
import { MessageBar } from '@reference-app-laravel-vue/ui-kit';
</script>
""",
    "NotificationCard": """<template>
  <NotificationCard type="success" title="Profile updated">
    All patient preferences were saved.
  </NotificationCard>
</template>

<script setup lang=\"ts\">
import { NotificationCard } from '@reference-app-laravel-vue/ui-kit';
</script>
""",
    "Panel": """<template>
  <Panel elevation="1">
    <template #title>Upcoming appointments</template>
    <div>3 appointments scheduled for today.</div>
  </Panel>
</template>

<script setup lang=\"ts\">
import { Panel } from '@reference-app-laravel-vue/ui-kit';
</script>
""",
    "ProgressIndicatorCircular": """<template>
  <ProgressIndicatorCircular :size="56" :width="6" color="primary" indeterminate />
</template>

<script setup lang=\"ts\">
import { ProgressIndicatorCircular } from '@reference-app-laravel-vue/ui-kit';
</script>
""",
    "ProgressIndicatorLinear": """<template>
  <ProgressIndicatorLinear color="primary" :model-value="62" />
</template>

<script setup lang=\"ts\">
import { ProgressIndicatorLinear } from '@reference-app-laravel-vue/ui-kit';
</script>
""",
    "Switch": """<template>
  <Switch v-model="enabled" label="Enable reminders" :required="true" />
</template>

<script setup lang=\"ts\">
import { ref } from 'vue';
import { Switch } from '@reference-app-laravel-vue/ui-kit';

const enabled = ref(false);
</script>
""",
    "Tooltip": """<template>
  <Tooltip type="rich" title="Why this field is required" :show-actions="true">
    <template #activator="{ props }">
      <Button v-bind="props" variant="text">More info</Button>
    </template>
    Required for claim validation and reporting.
    <template #actions>
      <Button variant="text" size="small">Learn more</Button>
    </template>
  </Tooltip>
</template>

<script setup lang=\"ts\">
import { Button, Tooltip } from '@reference-app-laravel-vue/ui-kit';
</script>
""",
}


def read_text(path: Path) -> str:
    if not path.exists():
        raise FileNotFoundError(f"File not found: {path}")
    return path.read_text(encoding="utf-8")


def extract_block(source: str, tag: str) -> str:
    match = re.search(rf"<{tag}[^>]*>([\s\S]*?)</{tag}>", source)
    return match.group(1).strip() if match else ""


def normalize_type(type_text: str) -> str:
    return re.sub(r"\s+", " ", type_text.strip())


def extract_jsdoc_summary(script_content: str) -> str:
    for match in re.finditer(r"/\*\*([\s\S]*?)\*/", script_content):
        text = clean_jsdoc(match.group(1))
        if text:
            return text
    return "Vue wrapper component based on Vuetify primitives."


def clean_jsdoc(jsdoc_body: str) -> str:
    lines = []
    for raw_line in jsdoc_body.splitlines():
        line = re.sub(r"^\s*\*\s?", "", raw_line).strip()
        if line:
            lines.append(line)
    return " ".join(lines).strip()


def split_props_block(props_block: str) -> Iterable[tuple[str, bool, str, str]]:
    pattern = re.compile(
        r"(?s)(?:/\*\*(.*?)\*/\s*)?([A-Za-z_][A-Za-z0-9_]*)(\?)?\s*:\s*([^;]+);"
    )
    for match in pattern.finditer(props_block):
        raw_comment = match.group(1) or ""
        name = match.group(2)
        optional = bool(match.group(3))
        type_text = normalize_type(match.group(4))
        comment = clean_jsdoc(raw_comment)
        yield name, (not optional), type_text, comment


def extract_defaults(script_content: str) -> dict[str, str]:
    match = re.search(
        r"withDefaults\s*\(\s*defineProps<\{[\s\S]*?\}>\s*\(\s*\)\s*,\s*\{([\s\S]*?)\}\s*\)",
        script_content,
    )
    if not match:
        return {}

    defaults_block = match.group(1)
    defaults: dict[str, str] = {}
    key_value_pattern = re.compile(r"([A-Za-z_][A-Za-z0-9_]*)\s*:\s*([^,]+),?")

    for line in defaults_block.splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("//"):
            continue
        kv_match = key_value_pattern.match(stripped)
        if kv_match:
            key = kv_match.group(1)
            value = kv_match.group(2).strip()
            defaults[key] = value

    return defaults


def extract_props(script_content: str) -> list[PropDoc]:
    match = re.search(r"defineProps<\{([\s\S]*?)\}>\s*\(", script_content)
    if not match:
        return []

    props_block = match.group(1)
    defaults = extract_defaults(script_content)

    props: list[PropDoc] = []
    for name, required, type_text, description in split_props_block(props_block):
        default_value = defaults.get(name, "-")
        desc = description or "-"
        props.append(
            PropDoc(
                name=name,
                type_text=type_text,
                required=required,
                default=default_value,
                description=desc,
            )
        )

    return props


def extract_slots(template_content: str) -> list[str]:
    slot_names: list[str] = []
    for match in re.finditer(r"<slot(?:\s+name=\"([^\"]+)\")?", template_content):
        slot_name = match.group(1) or "default"
        if slot_name not in slot_names:
            slot_names.append(slot_name)
    return slot_names


def parse_component_doc(component_name: str, file_name: str) -> ComponentDoc:
    component_path = UI_KIT_DIR / "src" / "components" / file_name
    source = read_text(component_path)

    template_content = extract_block(source, "template")
    script_content = extract_block(source, "script")

    return ComponentDoc(
        name=component_name,
        file_name=file_name,
        description=extract_jsdoc_summary(script_content),
        props=extract_props(script_content),
        slots=extract_slots(template_content),
        attrs_passthrough=("$attrs" in template_content or "useAttrs" in script_content),
    )


def parse_index_exports(index_content: str) -> list[tuple[str, str]]:
    export_pattern = re.compile(
        r"export\s+\{\s*default\s+as\s+([A-Za-z_][A-Za-z0-9_]*)\s*\}\s+from\s+'\.\/components\/([A-Za-z0-9_]+\.vue)';"
    )
    return [(m.group(1), m.group(2)) for m in export_pattern.finditer(index_content)]


def parse_type_exports(index_content: str) -> list[str]:
    exported: list[str] = []
    type_export_pattern = re.compile(r"export\s+type\s+\{\s*([^}]+)\s*\}\s+from")
    value_export_pattern = re.compile(r"export\s+\{\s*([^}]+)\s*\}\s+from\s+'\.\/types';")

    for match in type_export_pattern.finditer(index_content):
        for item in match.group(1).split(","):
            name = item.strip()
            if name and name not in exported:
                exported.append(name)

    for match in value_export_pattern.finditer(index_content):
        for item in match.group(1).split(","):
            name = item.strip()
            if name and name not in exported:
                exported.append(name)

    return exported


def parse_theme_exports(theme_content: str) -> list[str]:
    names: list[str] = []
    for match in re.finditer(r"export\s+\{\s*([^}]+)\s*\}\s+from", theme_content):
        for item in match.group(1).split(","):
            cleaned = item.strip()
            if cleaned.startswith("type "):
                cleaned = cleaned.replace("type ", "", 1).strip()
            if cleaned and cleaned not in names:
                names.append(cleaned)

    for match in re.finditer(r"export\s+type\s+\{\s*([^}]+)\s*\}\s+from", theme_content):
        for item in match.group(1).split(","):
            cleaned = item.strip()
            if cleaned and cleaned not in names:
                names.append(cleaned)

    return names


def make_component_summary_table(docs: list[ComponentDoc]) -> str:
    header = "| Component | Source file |\n|---|---|"
    rows = [f"| `{doc.name}` | `src/components/{doc.file_name}` |" for doc in docs]
    return "\n".join([header, *rows])


def make_props_table(props: list[PropDoc]) -> str:
    if not props:
        return "No component-specific props. All supported attributes are forwarded to Vuetify."

    lines = ["| Prop | Type | Required | Default | Description |", "|---|---|---|---|---|"]
    for prop in props:
        lines.append(
            "| `{}` | `{}` | {} | `{}` | {} |".format(
                prop.name,
                prop.type_text,
                "yes" if prop.required else "no",
                prop.default,
                prop.description,
            )
        )
    return "\n".join(lines)


def make_slot_list(slots: list[str]) -> str:
    if not slots:
        return "None"
    return ", ".join(f"`{slot}`" for slot in slots)


def make_component_section(doc: ComponentDoc) -> str:
    example = COMPONENT_EXAMPLES.get(
        doc.name,
        f"""<template>\n  <{doc.name} />\n</template>\n\n<script setup lang=\"ts\">\nimport {{ {doc.name} }} from '@reference-app-laravel-vue/ui-kit';\n</script>\n""",
    )

    passthrough_line = (
        "This component forwards extra attributes/listeners to the wrapped Vuetify component."
        if doc.attrs_passthrough
        else "This component does not expose generic attribute forwarding."
    )

    lines = [
        f"## {doc.name}",
        "",
        doc.description,
        "",
        "Import:",
        "",
        "```ts",
        f"import {{ {doc.name} }} from '@reference-app-laravel-vue/ui-kit';",
        "```",
        "",
        "Props:",
        "",
        make_props_table(doc.props),
        "",
        f"Slots: {make_slot_list(doc.slots)}",
        "",
        passthrough_line,
        "",
        "Example:",
        "",
        "```vue",
        example.rstrip(),
        "```",
        "",
    ]
    return "\n".join(lines)


def build_readme() -> str:
    index_content = read_text(INDEX_FILE)
    types_content = read_text(TYPES_FILE)
    theme_content = read_text(UI_KIT_DIR / "src" / "theme" / "index.ts")

    component_exports = parse_index_exports(index_content)
    docs = [parse_component_doc(name, file_name) for name, file_name in component_exports]
    type_exports = parse_type_exports(index_content)
    theme_exports = parse_theme_exports(theme_content)

    sections: list[str] = [
        "# UI Kit Library",
        "",
        "This document is generated by `scripts/generate_ui_kit_readme.py`.",
        "Do not edit it manually: run the generator instead.",
        "",
        "## What This Library Provides",
        "",
        "The package `@reference-app-laravel-vue/ui-kit` exposes reusable Vue 3 + Vuetify components,",
        "shared styles, and theme helpers used across the monorepo.",
        "",
        "- Components exported from `src/index.ts`",
        "- Shared Sass styles from `@reference-app-laravel-vue/ui-kit/styles`",
        "- Vuetify overrides from `@reference-app-laravel-vue/ui-kit/overrides`",
        "- Theme objects and typography helpers from `@reference-app-laravel-vue/ui-kit/theme`",
        "",
        "## Install and Setup",
        "",
        "In this monorepo, the package is consumed through workspace dependencies.",
        "",
        "```json",
        "{",
        "  \"dependencies\": {",
        "    \"@reference-app-laravel-vue/ui-kit\": \"workspace:*\"",
        "  }",
        "}",
        "```",
        "",
        "Basic setup example:",
        "",
        "```ts",
        "import { createApp } from 'vue';",
        "import { createVuetify } from 'vuetify';",
        "import 'vuetify/styles';",
        "import '@reference-app-laravel-vue/ui-kit/styles';",
        "import '@reference-app-laravel-vue/ui-kit/overrides';",
        "import { componentDefaults, lightTheme, darkTheme } from '@reference-app-laravel-vue/ui-kit/theme';",
        "",
        "const vuetify = createVuetify({",
        "  defaults: componentDefaults,",
        "  theme: {",
        "    defaultTheme: 'lightTheme',",
        "    themes: {",
        "      lightTheme,",
        "      darkTheme,",
        "    },",
        "  },",
        "});",
        "",
        "createApp(App).use(vuetify).mount('#app');",
        "```",
        "",
        "## Components",
        "",
        make_component_summary_table(docs),
        "",
    ]

    for doc in docs:
        sections.append(make_component_section(doc))

    sections.extend(
        [
            "## Exported Types",
            "",
            "From `src/index.ts` and `src/types.ts`:",
            "",
            "- " + "\n- ".join(f"`{name}`" for name in type_exports) if type_exports else "- None",
            "",
            "Types source excerpt:",
            "",
            "```ts",
            types_content.strip(),
            "```",
            "",
            "## Theme Exports",
            "",
            "Available from `@reference-app-laravel-vue/ui-kit/theme`:",
            "",
            "- " + "\n- ".join(f"`{name}`" for name in theme_exports) if theme_exports else "- None",
            "",
            "## Regenerate Documentation",
            "",
            "```bash",
            "python scripts/generate_ui_kit_readme.py",
            "```",
            "",
            "Use `--check` in CI to fail when `libs/ui-kit/README.md` is outdated.",
        ]
    )

    return "\n".join(sections).rstrip() + "\n"


def run(write: bool, check: bool, stdout: bool) -> int:
    content = build_readme()

    if stdout:
        print(content)

    existing = README_FILE.read_text(encoding="utf-8") if README_FILE.exists() else ""
    changed = existing != content

    if check:
        if changed:
            print("README is outdated. Run: python scripts/generate_ui_kit_readme.py", file=sys.stderr)
            return 1
        print("README is up to date.")
        return 0

    if write:
        README_FILE.write_text(content, encoding="utf-8")
        print(f"Updated {README_FILE.relative_to(REPO_ROOT)}")

    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate libs/ui-kit/README.md from ui-kit source files.")
    parser.add_argument("--check", action="store_true", help="Exit with code 1 if README is outdated.")
    parser.add_argument("--stdout", action="store_true", help="Print generated markdown to stdout.")
    parser.add_argument(
        "--no-write",
        action="store_true",
        help="Do not write README.md (use with --stdout to preview).",
    )
    args = parser.parse_args()

    return run(write=not args.no_write, check=args.check, stdout=args.stdout)


if __name__ == "__main__":
    raise SystemExit(main())
