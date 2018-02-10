function ajaxErrors(response) {
    if (response.status == 403) {
        switch (JSON.parse(response.responseText).errorValue) {
            case 0:
                return "Ошибка";
            default:
                return "Что-то пошло не так, попробуйте позже.";
        }
    }
    else return "Что-то пошло не так, попробуйте позже."
}