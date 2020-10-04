import React, { useState } from "react";
import { Container, Table, Modal, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/layout";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input/input";
import { addProducts } from "../../action/index.js";

export default function Products() {
  const [show, setshow] = useState(false);
  const [name, setname] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [productPicture, setproductPicture] = useState([]);

  const dispatch = useDispatch();

  const state = useSelector((state) => state.category);
  const products = useSelector((state) => state.product);

  const handleClose = () => {
    setshow(false);
  };

  const handleSave = (e) => {
    const newProduct = {
      name,
      price,
      description,
      quantity,
      category,
      productPicture,
    };

    dispatch(addProducts(newProduct));
    setshow(false);
  };

  const renderProducts = () => {
    let myProducts = [];

    products.product.map((item) => {
      myProducts.push(
        <tr>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{item.quantity}</td>
          <td>{item.description}</td>
          <td>{item.category}</td>
        </tr>
      );
    });
    return myProducts;
  };

  const getParentCategories = () => {
    let myCategories = [];
    state.category.map((item) => {
      myCategories.push(<option value={item._id}>{item.name}</option>);
    });

    return myCategories;
  };
  return (
    <Layout sidebar>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Product</h3>
              <button
                onClick={() => {
                  setshow(!show);
                }}
              >
                Add
              </button>
            </div>
          </Col>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>{renderProducts()}</tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              label="Product name"
              placeholder="Enter Product name"
              type="text"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />

            <Input
              label="Quantity"
              placeholder="Enter Quality "
              type="text"
              value={quantity}
              onChange={(e) => {
                setquantity(e.target.value);
              }}
            />

            <Input
              label="Price"
              placeholder="Enter Price "
              type="text"
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />

            <Input
              label="Description"
              placeholder="Enter Description "
              type="text"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />

            <Input
              placeholder="upload category image"
              type="file"
              onChange={(e) => {
                setproductPicture([...productPicture, e.target.files[0]]);
              }}
            />
            <select
              className="form-control"
              onChange={(e) => {
                setcategory(e.target.value);
              }}
            >
              <option>Select category</option>
              {getParentCategories()}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Layout>
  );
}
