(() => {
    const is_mobile = window.innerWidth <= 990;
    
    if (!is_mobile) return;

    const mobile_accordion = document.querySelector('.mobile_accordion');
    const mobile_accordion_content = document.querySelector('.mobile_accordion_content');

    mobile_accordion.addEventListener('click', () => {        
        const is_open = mobile_accordion_content.clientHeight > 0;

        if(is_open) {
            mobile_accordion_content.style.height = 0;
        } else {
            mobile_accordion_content.style.height = mobile_accordion_content.scrollHeight + "px"
        }
    })
})()