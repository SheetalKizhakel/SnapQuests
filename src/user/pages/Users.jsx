//PURPOSE - EVEN IF WE'RE NOT LOGGED IN, WE CAN SEE A LIST OF USERS AND HOW MANY PLACES THEY SHARED
import react from "react";
import UsersList from "../components/UsersList";
function Users()
{
    const USERS=[{id:"u1",
        name:"Sheetal",
        image:"https://ecologytraining.co.uk/wp-content/uploads/2021/07/Birds-for-Beginners-450x336.jpg",
        places:3}
        ];
    return(
        <UsersList items={USERS}/>
    )
}
export default Users;