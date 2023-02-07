import "../admin.css";
import React, { useEffect, useState } from "react";
import { Table, Button, Dropdown } from "react-bootstrap";
import axios from "../../../../api/axios";

import UserX from '../../../../assets/icons/UserX'

const Users = (props) => {
    const {
        usersToShow,
        handleGetUsers,
        rolesToShow,
        handleGetRoles,
    } = props;

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            handleGetUsers();
            handleGetRoles();
            setIsLoading(false);
        }
    }, [isLoading]);

    const handleDeleteUser = async (id) => {
        try {
            await axios.patch(`/user/delete/${id}`);
            handleGetUsers();
            setIsLoading(true);
        } catch (error) {
            console.log("mori");
        }
    };

    const dateFormatter = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toDateString();
    };

    const editRole = async (id, roleId) => {
        try {
            await axios.patch(`/user/${id}`, { role: roleId });
            setIsLoading(true);
        } catch (error) {
            console.log('mori');
        }
    }

    return (
        <>
            <div className="abm-container">
                <div className="overflow-table-container">
                    <Table className="table-container" size="sm">
                        <thead>
                            <tr>
                                <th>role</th>
                                <th>username</th>
                                <th>email</th>
                                <th>member since</th>
                                <th>options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersToShow?.map((user, index) => (
                                <tr key={index}>
                                    <td>
                                        <Dropdown className="m-1">
                                            <Dropdown.Toggle variant='danger' className="btn-dropdown">
                                                {user.role?.name}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    rolesToShow ?
                                                        rolesToShow.map((role, index) => (
                                                            <Dropdown.Item
                                                                onClick={() => editRole(user?._id, role?._id)}
                                                                key={index}
                                                            >
                                                                {role?.name}
                                                            </Dropdown.Item>
                                                        ))
                                                        :
                                                        ''
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{dateFormatter(user.createdAt)}</td>
                                    <td>
                                        <Button
                                            onClick={() =>
                                                handleDeleteUser(user._id)
                                            }
                                            variant='danger'
                                            className="btn-User"
                                        >
                                            <UserX />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default Users
