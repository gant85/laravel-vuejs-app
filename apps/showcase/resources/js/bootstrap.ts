import axios from 'axios';

// Axios setup (currently unused - Inertia.js handles requests)
// Uncomment if you need to make custom AJAX requests
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
