interface Props {
    estado: string;
}

export const ReservaStatusBadge = ({
    estado
}: Props) => {

    const colors = {

        PENDIENTE:
            "bg-yellow-100 text-yellow-700",

        CONFIRMADA:
            "bg-blue-100 text-blue-700",

        COMPLETADA:
            "bg-green-100 text-green-700",

        CANCELADA:
            "bg-red-100 text-red-700",

    };

    return (

        <span
            className={`
                px-3 py-1 rounded-full
                text-sm font-semibold
                ${colors[
                    estado as keyof typeof colors
                ]}
            `}
        >
            {estado}
        </span>

    );
};