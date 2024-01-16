// assets/js/theme.js

document.addEventListener('DOMContentLoaded', function () {
    function saveTheme() {
        const form = document.getElementById('themeCustomizationForm');
        const formData = new FormData(form);

        fetch('/save-theme', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Rafraîchissez la page pour appliquer le nouveau thème
                window.location.reload();
            } else {
                console.error('Erreur lors de l\'enregistrement du thème');
            }
        })
        .catch(error => {
            console.error('Erreur lors de l\'enregistrement du thème:', error);
        });
    }
});
