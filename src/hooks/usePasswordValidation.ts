// src/hooks/usePasswordValidation.ts
import { useState } from 'react';

export function usePasswordValidation() {
    const [errors, setErrors] = useState({
        current: '',
        new: '',
        confirm: '',
        mismatch: '',
    });

    const validate = ({
                          current,
                          newPassword,
                          confirm,
                      }: {
        current: string;
        newPassword: string;
        confirm: string;
    }) => {
        const newErrors: typeof errors = {
            current: '',
            new: '',
            confirm: '',
            mismatch: '',
        };

        if (!current) newErrors.current = 'Ingresa tu contraseña actual';
        if (!newPassword) newErrors.new = 'Ingresa una nueva contraseña';
        if (!confirm) newErrors.confirm = 'Repite la nueva contraseña';
        if (newPassword && confirm && newPassword !== confirm)
            newErrors.mismatch = 'Las contraseñas no coinciden';

        setErrors(newErrors);

        return Object.values(newErrors).every((e) => e === '');
    };

    return { errors, validate };
}
