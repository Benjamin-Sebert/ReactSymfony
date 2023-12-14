import React from 'react';

const MyComponent = (props) => {
    return (
        <div className="MyComponent text-red-500">
            <div>hellorefdfsfsfsd {props.fullName}</div>
            <a href="/home" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
        </div>
    )
}

export default MyComponent;