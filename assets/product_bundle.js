(() => {
    const add_bundle_btns = document.querySelectorAll('#add_bundle');

    const init_loading = (add_bundle_btn_spiner, add_bundle_btn_svg) => {
        add_bundle_btn_spiner.removeAttribute('hidden');
        add_bundle_btn_svg.removeAttribute('hidden');
    }

    const stop_loading = (add_bundle_btn_spiner, add_bundle_btn_svg) => {
        add_bundle_btn_spiner.setAttribute('hidden', '');
        add_bundle_btn_svg.setAttribute('hidden', '');
    }

    const add_products = (add_bundle_btn) => {
        const t4s_product__bundle = add_bundle_btn.closest('.t4s-product__bundle');
        const bundle_products = t4s_product__bundle.querySelectorAll('.bundle_product');
        const bundle_products_checked = t4s_product__bundle.querySelectorAll('.bundle_product:has([type="checkbox"]:checked)');
        const bundle_products_length = bundle_products_checked.length - 1;

        const add_bundle_btn_spiner = add_bundle_btn.querySelector('.t4s-loading__spinner');
        const add_bundle_btn_svg = add_bundle_btn_spiner.querySelector('svg');    

        let count = 0;

        const init_adding = () => {
            const is_all_iterations = count > bundle_products_length;

            if(is_all_iterations) return;

            const is_checked = bundle_products_checked[count].querySelector('input[type="checkbox"]')?.checked;

            console.log(is_checked);

            if(!is_checked && !is_all_iterations) {
                count++;
                init_adding();

                return;
            };

            const is_loading = !add_bundle_btn_spiner.hasAttribute('hidden');

            !is_loading && init_loading(add_bundle_btn_spiner, add_bundle_btn_svg);

            const variant_id = bundle_products_checked[count].dataset.id;

            fetch('/cart/add.js', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                id: variant_id,
                quantity: 1
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);                
            })
            .catch(err => console.error(err))
            .finally(() => {
                count++;

                if(count > bundle_products_length) { 

                    stop_loading(add_bundle_btn_spiner, add_bundle_btn_svg);
                    window.location.reload();
                    return;
                } else {
                    init_adding(add_bundle_btn_spiner, add_bundle_btn_svg);
                };
            });
        };

        init_adding();
    };

    add_bundle_btns.forEach(btn => {

        btn.addEventListener('click', evt => {
            const btn_target = evt.target.closest('button');

            if(btn_target) {
                evt.preventDefault();
            }

            add_products(btn_target)
        })
    });
    

})()