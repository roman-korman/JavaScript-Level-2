'use strict';



const WorkWithText = {
    textFromDom: [],
    textToDom: [],
    regexOpen: / '/gm,
    regexClose: /' /gm,

    getTextFromDom() {
        this.textFromDom[0] = document.querySelector('.text').innerHTML;
        this.textToDom = this.textFromDom.slice(0);
    },

    putTextToDom() {
        document.querySelector('.text').innerHTML = this.textToDom[0];
    },

    textSymbolReplace() {
        this.textToDom[0] = this.textToDom[0].replace(this.regexOpen, ' «');
        this.textToDom[0] = this.textToDom[0].replace(this.regexClose, '» ');
    },

    fixText() {
        this.getTextFromDom();
        this.textSymbolReplace();
        this.putTextToDom();
    }
};
