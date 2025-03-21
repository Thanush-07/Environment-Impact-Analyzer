function navigateToPage(event) {
    let link = event.currentTarget.getAttribute('data-link');
    if (link) {
        window.location.href = link;
    } else {
        console.error("No valid link found.");
    }
}
