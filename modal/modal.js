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
                    z-index: 10;
                }

                #modal {
                    background: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
                    height: 30rem;
                    left: 25%;
                    position: fixed;
                    top: 15vh;
                    width: 50%;
                    z-index: 100;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal"></div>
        `;
    }
}

customElements.define('uc-modal', Modal);