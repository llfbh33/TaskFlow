import { LiaEllipsisVSolid } from "react-icons/lia";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const ListActions = ({id, name, actionItem, setActionItem, handleEdit, handleDelete}) => {

    return (
        <div className="action-wrapper">
            <button className="icon-button" onClick={() => setActionItem(id)}>
                <LiaEllipsisVSolid />
            </button>

            {actionItem === id && (
                <div className="action-container" onMouseLeave={() => setActionItem(null)}>
                    <div className="action-menu">
                        <button className="icon-button" onClick={() => handleEdit(id)}><MdEdit /></button>
                        <button className="icon-button" onClick={() => handleDelete(id, name)}><MdDelete /></button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ListActions;