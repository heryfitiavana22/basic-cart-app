let numberFormatter = new Intl.NumberFormat("en-US");

function formatNumber(num) {
    return numberFormatter.format(num)
}

function formatStars(star) {
    return star.toString().padEnd(2, '0').split("").join(".");
}
