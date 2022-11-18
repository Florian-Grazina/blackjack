export const ButtonUtils = {
    btnDisable: (btn) => {
        btn.disabled = true;
        btn.className = "buttonGray";
    },
    btnEnable: (btn) => {
        btn.disabled = false;
        btn.className = "button";
    }
}