class Products {
    products = [];
    productsContainerHTML = document.querySelector(".products");

    constructor(products) {
        this.products = products;
    }

    removeProducts() {
        this.productsContainerHTML.innerHTML = "";
    }

    render() {
        this.removeProducts();

        for (let p of this.products) {
            let product = new Product(p);
            product.render()
        }
    }
}
