import { useModal } from "../../context/Modal";

const DeleteModal = ({ subject, name, action, id }) => {
    const { closeModal } = useModal();


    return (
        <div>
            <h1 className="modal-delete-title">{`Do you want to delete this ${subject}?`}</h1>
            <p className="modal-delete-subtitle">{name}</p>
            <div style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                height: "60px",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "30px",
            }}>
                <button className='modal-submit-delete'onClick={(e) => action(e, id)}>Delete</button>
                <button className='modal-submit-keep' onClick={() => closeModal()}>Keep</button>
            </div>
        </div>
    )
}

export default DeleteModal;