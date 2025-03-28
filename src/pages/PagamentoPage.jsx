import "../components-CSS/PagamentoCSS.css";
import GlobalContext from '../cotext/GlobalContest';
import { useContext } from "react";

export default function PagamentoPage() {
    const { finalTotal } = useContext(GlobalContext);
    return (
        <>
            <h1>PAGINA DEL PAGAMENTO di €{finalTotal.toFixed(2)}</h1>
        </>
    );
}
