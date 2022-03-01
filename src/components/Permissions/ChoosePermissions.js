import {Button, Select} from "@chakra-ui/react";
import {useState} from "react";

const ChoosePermissions = ({permissions}) => {
    const [listPermissionId, setListPermissionId] = useState([])

    const changeListPermission = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setListPermissionId([...value])
        console.log(listPermissionId)
    }

    return (<>
        <Select onChange={changeListPermission} multiple>
            {permissions && permissions.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
        </Select>
        <Button>Update permission</Button>
    </>)
}
export default ChoosePermissions