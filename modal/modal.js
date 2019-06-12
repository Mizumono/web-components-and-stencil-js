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
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    left: 25%;
                    position: fixed;
                    top: 15vh;
                    width: 50%;
                    z-index: 100;
                }

                header {
                    padding: 1rem;
                }

                header h1 {
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
                    <h1>Please Confirm</h1>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button>Cancel</button>
                    <button>Okay</button>
                </section>
            </div>
        `;
    }
}

customElements.define('uc-modal', Modal);