class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    background: rgba(0, 0, 0, 0.75);
                    height: 100vh;
                    left: 0;
                    position: fixed;
                    top: 0;
                    width: 100%;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal"></div>
        `;
    }
}

customElements.define('uc-modal', Modal);