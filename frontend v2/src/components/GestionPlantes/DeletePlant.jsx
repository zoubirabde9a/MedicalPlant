import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import { useEffect, useRef, useState } from "react";

const DeletePlant = (props) => {

    const onOk = () =>
    {
        const queryParams = new URLSearchParams();
        queryParams.append("plantId", props?.itemData?.plantId);

        const url = `http://localhost:5202/api/Plant/Remove?${queryParams.toString()}`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            response.json().then((data) => {
                props.fetchData();
            })
            .catch((error) => console.log(error));

        })
        props.setShowDeletePlant(false)
    }

    const onClose = () =>
    {
        props.setShowDeletePlant(false)
    }

    return props.showDeletePlant ? (
        <Modal title={("Supprimer l'element " + props?.itemData?.latinName)} open={props.showDeletePlant} onOk={onOk} onCancel={onClose}>
            Etes-vous sûr que vous voulez supprimer
        </Modal>
    ) : null;
};
export default DeletePlant;
