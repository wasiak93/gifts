import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Login";
import firebase from "./Config";
import Table from "react-bootstrap/Table";
import { Container, Button, NavLink } from "react-bootstrap";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => setIsLoggedIn(!!user));
    firebase
      .firestore()
      .collection("Gifts")
      .onSnapshot((querySnapshot) => {
        let elementsList = [];
        querySnapshot.forEach((doc) => {
          elementsList.push({ ...doc.data(), id: doc.id });
        });
        setElements(elementsList);
      });
  }, []);

  const handlerButton = (id) => {
    let elementsNew = elements.map((el) => {
      return id === el.id
        ? {
            ...el,
            checked: true,
          }
        : el;
    });
    elementsNew.forEach((el) => {
      if (id === el.id) {
        firebase
          .firestore()
          .collection("Gifts")
          .doc(id)
          .set({ ...el });
      }
    });
    setElements(elementsNew);
  };
  const listItems = elements.map((element) => {
    return (
      // <li key={element.id} className="list_item item">
      //   <p>{element.name}</p>
      //   <p>{element.price}</p>
      //   <p>{element.quantity}</p>
      //   <a href={element.url} target="_blank" rel="noopener noreferrer">
      //     Link
      //   </a>
      //   {element.checked ? (
      //     <p>zarezerwowane</p>
      //   ) : (
      //     <button onClick={() => handlerButton(element.id)}>zarezerwuj</button>
      //   )}
      // </li>
      <tr key={element.id}>
        <td>{element.name}</td>
        <td>
          {" "}
          <NavLink href={element.url} target="_blank" rel="noopener noreferrer">
            Link
          </NavLink>
        </td>
        <td>{element.price}</td>
        <td>{element.quantity}</td>

        <td>
          {" "}
          {element.checked ? (
            "zarezerowane"
          ) : (
            <Button
              className="btn btn-danger "
              onClick={() => handlerButton(element.id)}
            >
              zarezerwuj
            </Button>
          )}
        </td>
      </tr>
    );
  });
  return (
    <Container className="sm" style={{ padding: "0" }}>
      {isLoggedIn ? (
        /* <button onClick={() => firebase.auth().signOut()}>Logout</button> */
        /* <ul className="list">{listItems}</ul>
         */

        <Table className="table table-striped table-hover table-sm table-bordered ">
          <thead className="thead-dark">
            <tr>
              <th>Nazwa</th>
              <th>Link</th>
              <th>Cena</th>
              <th>Ilość</th>
              <th>Stan</th>
            </tr>
          </thead>
          <tbody>{listItems}</tbody>
        </Table>
      ) : (
        <Login />
      )}
    </Container>
  );
};

export default App;
