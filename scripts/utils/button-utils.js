export const ButtonUtils = {
    btnDisable: (btn) => {
        btn.disabled = true;
        btn.className = "button_gray";
    },
    btnEnable: (btn) => {
        btn.disabled = false;
        btn.className = "button";
    }
}