const Email = ({ tx_id, purchase_link }) => {
    return (
        <div>
            <strong style={{ fontFamily: "monospace" }}>Hey,</strong>
            <p style={{ fontFamily: "monospace" }}>Click on the button below to download your purchase.</p>
            <p style={{ fontFamily: "monospace" }}>Your transaction id: {tx_id}</p>
            <a href={purchase_link} target="_blank" style={{ marginBottom: 20, textDecoration: "none", background: "white", padding: "10px 15px", fontSize: 16, fontWeight: "bold", border: "2px solid black", color: "black", fontFamily: "inherit" }}>Download</a>
        </div>
    )
}

export default Email