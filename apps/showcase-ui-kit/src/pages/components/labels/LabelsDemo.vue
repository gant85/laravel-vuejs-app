<template>
  <v-container>
    <!-- Header -->
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">ah-labels</h1>
      <p class="text-grey-darken-1 mt-2">
        ah-labels are compact tag-like elements built on top of Vuetify's
        <code>v-chip</code>. They convey status, category or metadata. The look &amp; feel is
        defined by the <code>_ah-labels.scss</code> override (3 sizes, all variants, semantic
        colors).
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Default Primary Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.variants" />
      </v-sheet>

      <div class="d-flex align-center flex-wrap ga-4 mt-4">
        <div class="ah-label small"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label medium"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label large"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label x-large"><v-icon icon="star-filled"></v-icon>Badge</div>
      </div>
    </div>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Default Error Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.errorVariants" />
      </v-sheet>

      <div class="d-flex align-center flex-wrap ga-4 mt-4">
        <div class="ah-label small error"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label medium error"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label large error"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label x-large error"><v-icon icon="star-filled"></v-icon>Badge</div>
      </div>
    </div>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Default Warning Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.warningVariants" />
      </v-sheet>

      <div class="d-flex align-center flex-wrap ga-4 mt-4">
        <div class="ah-label small warning"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label medium warning"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label large warning"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label x-large warning"><v-icon icon="star-filled"></v-icon>Badge</div>
      </div>
    </div>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Default Success Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.successVariants" />
      </v-sheet>

      <div class="d-flex align-center flex-wrap ga-4 mt-4">
        <div class="ah-label small success"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label medium success"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label large success"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label x-large success"><v-icon icon="star-filled"></v-icon>Badge</div>
      </div>
    </div>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Default Important Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.importantVariants" />
      </v-sheet>

      <div class="d-flex align-center flex-wrap ga-4 mt-4">
        <div class="ah-label small important"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label medium important"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label large important"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label x-large important"><v-icon icon="star-filled"></v-icon>Badge</div>
      </div>
    </div>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Default Info Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.infoVariants" />
      </v-sheet>

      <div class="d-flex align-center flex-wrap ga-4 mt-4">
        <div class="ah-label small info"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label medium info"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label large info"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label x-large info"><v-icon icon="star-filled"></v-icon>Badge</div>
      </div>
    </div>

    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Tonal Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.tonalVariants" />
      </v-sheet>

      <div class="d-flex align-center flex-wrap ga-4 mt-4">
        <div class="ah-label small variant-tonal"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label medium variant-tonal"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label large variant-tonal"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label x-large variant-tonal"><v-icon icon="star-filled"></v-icon>Badge</div>
      </div>
    </div>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Tonal Error Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.tonalErrorVariants" />
      </v-sheet>

      <div class="d-flex align-center flex-wrap ga-4 mt-4">
        <div class="ah-label small variant-tonal error">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
        <div class="ah-label medium variant-tonal error">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
        <div class="ah-label large variant-tonal error">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
        <div class="ah-label x-large variant-tonal error">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
      </div>
    </div>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Tonal Warning Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.tonalWarningVariants" />
      </v-sheet>

      <div class="d-flex align-center flex-wrap ga-4 mt-4">
        <div class="ah-label small variant-tonal warning">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
        <div class="ah-label medium variant-tonal warning">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
        <div class="ah-label large variant-tonal warning">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
        <div class="ah-label x-large variant-tonal warning">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
      </div>
    </div>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Tonal Success Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.tonalSuccessVariants" />
      </v-sheet>

      <div class="d-flex align-center flex-wrap ga-4 mt-4">
        <div class="ah-label small variant-tonal success">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
        <div class="ah-label medium variant-tonal success">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
        <div class="ah-label large variant-tonal success">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
        <div class="ah-label x-large variant-tonal success">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
      </div>
    </div>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Tonal Important Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.tonalImportantVariants" />
      </v-sheet>

      <div class="d-flex align-center flex-wrap ga-4 mt-4">
        <div class="ah-label small variant-tonal important">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
        <div class="ah-label medium variant-tonal important">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
        <div class="ah-label large variant-tonal important">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
        <div class="ah-label x-large variant-tonal important">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
      </div>
    </div>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Tonal Info Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.tonalInfoVariants" />
      </v-sheet>

      <div class="d-flex align-center flex-wrap ga-4 mt-4">
        <div class="ah-label small variant-tonal info">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
        <div class="ah-label medium variant-tonal info">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
        <div class="ah-label large variant-tonal info">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
        <div class="ah-label x-large variant-tonal info">
          <v-icon icon="star-filled"></v-icon>Badge
        </div>
      </div>
    </div>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Text Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.textVariants" />
      </v-sheet>

      <div class="d-flex align-center flex-wrap ga-4 mt-4">
        <div class="ah-label small variant-text"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label medium variant-text"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label large variant-text"><v-icon icon="star-filled"></v-icon>Badge</div>
        <div class="ah-label x-large variant-text"><v-icon icon="star-filled"></v-icon>Badge</div>
      </div>
    </div>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Text Error Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.textErrorVariants" />
      </v-sheet>

      <div>
        <div class="d-flex align-center flex-wrap ga-4 mt-4">
          <div class="ah-label small variant-text error">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
          <div class="ah-label medium variant-text error">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
          <div class="ah-label large variant-text error">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
          <div class="ah-label x-large variant-text error">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
        </div>
      </div>
    </div>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Text Warning Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.textWarningVariants" />
      </v-sheet>

      <div>
        <div class="d-flex align-center flex-wrap ga-4 mt-4">
          <div class="ah-label small variant-text warning">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
          <div class="ah-label medium variant-text warning">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
          <div class="ah-label large variant-text warning">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
          <div class="ah-label x-large variant-text warning">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
        </div>
      </div>
    </div>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Text Success Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.textSuccessVariants" />
      </v-sheet>

      <div>
        <div class="d-flex align-center flex-wrap ga-4 mt-4">
          <div class="ah-label small variant-text success">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
          <div class="ah-label medium variant-text success">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
          <div class="ah-label large variant-text success">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
          <div class="ah-label x-large variant-text success">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Text important Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.textImportantVariants" />
      </v-sheet>

      <div>
        <div class="d-flex align-center flex-wrap ga-4 mt-4">
          <div class="ah-label small variant-text important">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
          <div class="ah-label medium variant-text important">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
          <div class="ah-label large variant-text important">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
          <div class="ah-label x-large variant-text important">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
        </div>
      </div>
    </div>
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Text info Variants</h3>
      <v-sheet
        color="grey-lighten-4"
        rounded>
        <HighlightedCode :code="examples.textInfoVariants" />
      </v-sheet>

      <div>
        <div class="d-flex align-center flex-wrap ga-4 mt-4">
          <div class="ah-label small variant-text info">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
          <div class="ah-label medium variant-text info">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
          <div class="ah-label large variant-text info">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
          <div class="ah-label x-large variant-text info">
            <v-icon icon="star-filled"></v-icon>Badge
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import HighlightedCode from '../../../components/HighlightedCode.vue';

const examples = {
  variants: `
  <div class="ah-label small"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label medium"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label large"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label x-large"><v-icon icon="star-filled"></v-icon>Badge</div>`,

  errorVariants: `
  <div class="ah-label small error"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label medium error"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label large error"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label x-large error"><v-icon icon="star-filled"></v-icon>Badge</div>`,

  warningVariants: `
  <div class="ah-label small warning"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label medium warning"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label large warning"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label x-large warning"><v-icon icon="star-filled"></v-icon>Badge</div>`,

  successVariants: `
  <div class="ah-label small success"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label medium success"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label large success"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label x-large success"><v-icon icon="star-filled"></v-icon>Badge</div>`,

  importantVariants: `
  <div class="ah-label small important"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label medium important"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label large important"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label x-large important"><v-icon icon="star-filled"></v-icon>Badge</div>`,

  infoVariants: `
  <div class="ah-label small info"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label medium info"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label large info"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label x-large info"><v-icon icon="star-filled"></v-icon>Badge</div>`,

  tonalVariants: `
  <div class="ah-label small variant-tonal"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label medium variant-tonal"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label large variant-tonal"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label x-large variant-tonal"><v-icon icon="star-filled"></v-icon>Badge</div>
`,
  tonalErrorVariants: `
    <div class="ah-label small variant-tonal error"><v-icon icon="star-filled"></v-icon>Badge</div>
    <div class="ah-label medium variant-tonal error"><v-icon icon="star-filled"></v-icon>Badge</div>
    <div class="ah-label large variant-tonal error"><v-icon icon="star-filled"></v-icon>Badge</div>
    <div class="ah-label x-large variant-tonal error"><v-icon icon="star-filled"></v-icon>Badge</div>
`,
  tonalWarningVariants: `
    <div class="ah-label small variant-tonal warning"><v-icon icon="star-filled"></v-icon>Badge</div>
    <div class="ah-label medium variant-tonal warning"><v-icon icon="star-filled"></v-icon>Badge</div>
    <div class="ah-label large variant-tonal warning"><v-icon icon="star-filled"></v-icon>Badge</div>
    <div class="ah-label x-large variant-tonal warning"><v-icon icon="star-filled"></v-icon>Badge</div>
`,
  tonalSuccessVariants: `
    <div class="ah-label small variant-tonal success"><v-icon icon="star-filled"></v-icon>Badge</div>
    <div class="ah-label medium variant-tonal success"><v-icon icon="star-filled"></v-icon>Badge</div>
    <div class="ah-label large variant-tonal success"><v-icon icon="star-filled"></v-icon>Badge</div>
    <div class="ah-label x-large variant-tonal success"><v-icon icon="star-filled"></v-icon>Badge</div>
`,
  tonalImportantVariants: `
    <div class="ah-label small variant-tonal important"><v-icon icon="star-filled"></v-icon>Badge</div>
    <div class="ah-label medium variant-tonal important"><v-icon icon="star-filled"></v-icon>Badge</div>
    <div class="ah-label large variant-tonal important"><v-icon icon="star-filled"></v-icon>Badge</div>
    <div class="ah-label x-large variant-tonal important"><v-icon icon="star-filled"></v-icon>Badge</div>
`,
  tonalInfoVariants: `
    <div class="ah-label small variant-tonal info"><v-icon icon="star-filled"></v-icon>Badge</div>
    <div class="ah-label medium variant-tonal info"><v-icon icon="star-filled"></v-icon>Badge</div>
    <div class="ah-label large variant-tonal info"><v-icon icon="star-filled"></v-icon>Badge</div>
    <div class="ah-label x-large variant-tonal info"><v-icon icon="star-filled"></v-icon>Badge</div>
`,
  textVariants: `
  <div class="ah-label small variant-text"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label medium variant-text"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label large variant-text"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label x-large variant-text"><v-icon icon="star-filled"></v-icon>Badge</div>
`,
  textErrorVariants: `
  <div class="ah-label small variant-text error"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label medium variant-text error"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label large variant-text error"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label x-large variant-text error"><v-icon icon="star-filled"></v-icon>Badge</div>
`,
  textWarningVariants: `
  <div class="ah-label small variant-text warning"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label medium variant-text warning"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label large variant-text warning"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label x-large variant-text warning"><v-icon icon="star-filled"></v-icon>Badge</div>
`,
  textSuccessVariants: `
  <div class="ah-label small variant-text success"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label medium variant-text success"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label large variant-text success"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label x-large variant-text success"><v-icon icon="star-filled"></v-icon>Badge</div>
`,
  textImportantVariants: `
  <div class="ah-label small variant-text important"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label medium variant-text important"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label large variant-text important"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label x-large variant-text important"><v-icon icon="star-filled"></v-icon>Badge</div>
`,
  textInfoVariants: `
  <div class="ah-label small variant-text info"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label medium variant-text info"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label large variant-text info"><v-icon icon="star-filled"></v-icon>Badge</div>
  <div class="ah-label x-large variant-text info"><v-icon icon="star-filled"></v-icon>Badge</div>
`,
};
</script>
