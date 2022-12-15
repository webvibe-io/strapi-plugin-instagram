const generateAuthState = () => {
    return URL.createObjectURL(new Blob([])).slice(-36);
}

export default generateAuthState;
