import { loadRecepies, setEventListeners } from './dom.js';

const runMainScript = () => {
    document.addEventListener('DOMContentLoaded', () => {
        loadRecepies();
        setEventListeners();
    });
}


runMainScript()