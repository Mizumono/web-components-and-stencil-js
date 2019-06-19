class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOpen = false;
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    background: rgba(0, 0, 0, 0.75);
                    height: 100vh;
                    left: 0;
                    opacity: 0;
                    pointer-events: none;
                    position: fixed;
                    top: 0;
                    width: 100%;
                    z-index: 10;
                }

                :host([opened]) #backdrop {
                    opacity: 1;
                    pointer-events: all;
                }

                #modal {
                    background: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    left: 25%;
                    opacity: 0;
                    pointer-events: none;
                    position: fixed;
                    top: 15vh;
                    width: 50%;
                    z-index: 100;
                }

                :host([opened]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }

                header {
                    padding: 1rem;
                }

                ::slotted(h1) {
                    font-size: 1.25rem;
                }

                #main {
                    padding: 1rem;
                }

                #actions {
                    border-top: 1px solid #ccc;
                    display: flex;
                    justify-content: flex-end;
                    padding: 1rem;
                }

                #actions button {
                    margin: 0 0.25rem;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name="title">Please Confirm Payment</slot>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button id="cancel-btn">Cancel</button>
                    <button id="confirm-btn">Okay</button>
                </section>
            </div>
        `;

        const slots = this.shadowRoot.querySelectorAll('slot');
        slots[1].addEventListener('slotchange', event => {
            console.dir(slots[1].assignedNodes());
        });
        const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
        const confirmButton = this.shadowRoot.querySelector('#confirm-btn');
        cancelButton.addEventListener('click', this._cancel.bind(this));
        confirmButton.addEventListener('click', this._confirm.bind(this));
        cancelButton.addEventListener('cancel', () => {
            console.log('Cancel inside the component');
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.hasAttribute('opened')) {
            this.isOpen = true;
            // this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
            // this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
            // this.shadowRoot.querySelector('#modal').style.opacity = 1;
            // this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
        } else {
            this.isOpen = false;
        }
    }

    static get observedAttributes() {
        return ['opened'];
    }

    open() {
        this.setAttribute('opened', '');
    }

    hide() {
        if (this.hasAttribute('opened')) {
            this.removeAttribute('opened');
        }
        this.isOpen = false;
    }

    _cancel(event) {
        this.hide();
        const cancelEvent = new Event('cancel');
        event.target.dispatchEvent(cancelEvent);
    }

    _confirm() {
        this.hide();
    }
}

customElements.define('uc-modal', Modal);