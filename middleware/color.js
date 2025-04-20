export default function ({ route, store }) {
    let color = "dfgdf"
    switch (route.name) {
        case 'home':
            color = "#e4801d";
            break;
        case 'archive':
            color = "#8db230";
            break;
        case 'search':
            color = "#7d80bd";
            break;
        case 'alert':
            color = "#A22A2A";
            break;
        case 'settings':
            color = "#e0ad1f";
            break;
        case 'help':
            color = "#e0ad1f";
            break;
        default:
            color = "#e4801d";
            break;
    }
    store.commit('SET_GLOBAL_COLOR_PANEL', { backgroundColor: color })
}