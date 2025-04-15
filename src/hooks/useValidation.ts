export type ValidationErrors = {
    [key: string]: string | undefined;
};

export function useValidation() {
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email.trim());
    };

    const validateLogin = (fields: { email: string; password: string }) => {
        const errors: ValidationErrors = {};

        if (!fields.email.trim()) {
            errors.email = 'El correo es obligatorio';
        } else if (!validateEmail(fields.email)) {
            errors.email = 'El correo no tiene un formato válido';
        }

        if (!fields.password.trim()) {
            errors.password = 'La contraseña es obligatoria';
        }

        return errors;
    };

    return {
        validateLogin,
        validateEmail,
    };
}
