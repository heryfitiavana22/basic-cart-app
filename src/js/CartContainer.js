class CartContainer {
    counter = 0;
    total = 0;
    carts = new Map();
    mainHTML = document.querySelector(".header-main");
    iconCartHTML = document.querySelector(".icon-cart");
    counterHTML = document.querySelector(".icon-cart .counter");
    iconCloseHTML = document.querySelector(".cart-container .icon-close");
    cartContainerHTML = document.querySelector(".cart-container");
    listCartHTML = document.querySelector(".list-cart");
    totalHTML = document.querySelector(".total-cart .total");

    constructor() {
        this.handleClick();
    }

    handleClick() {
        this.iconCartHTML.onclick = (e) => {
            this.cartContainerHTML.style.transform = "scale(1)";
            this.mainHTML.classList.add("fix")
        };

        this.iconCloseHTML.onclick = (e) => {
            this.cartContainerHTML.style.transform = "scale(0)";
            this.mainHTML.classList.remove("fix")
        };
    }

    addCart(product) {
        this.counter++;
        this.updateCounter();

        // if it already exist
        if (CartContainer.IDLIST.includes(product.id)) {
            console.log('exost');
            // increment
            this.carts.get(product.id).increment();
            this.updateTotal();
            return;
        }

        let cart = new Cart(product);
        // render cart
        cart.render();
        cart.increment();
        cart.handleOnDelete(this);
        // save cart
        this.carts.set(product.id, cart);
        // update cartContainer
        this.updateTotal();
        CartContainer.IDLIST.push(product.id);
    }

    removeCart(currentId) {
        document.querySelector(`.ii-${currentId}`).remove();
        this.carts.delete(currentId);
        this.removed();
        // delete from id list
        CartContainer.IDLIST.forEach((id, k) => {
            if(id === currentId) {
                CartContainer.IDLIST.splice(k,1)
                return
            }
        })
    }

    updateTotal() {
        console.log('updatetotal cartcontainer');
        this.total = this.getTotal();
        this.totalHTML.innerHTML = `$${formatNumber(this.total)}`;
    }

    getTotal() {
        let total = 0;

        this.carts.forEach((cart) => {
            total += cart.total;
        });

        return total;
    }

    updateCounter() {
        this.counterHTML.innerHTML = this.counter > 9 ? "+9" : this.counter;
    }

    removed() {
        this.updateTotal();
        this.counter--;
        this.updateCounter();
    }

    static IDLIST = [];
}
