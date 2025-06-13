import React, { useEffect, useState } from "react";
import { OrdersApi } from "../../../../entities/OrdersApi";
import { useNavigate } from "react-router";
import "toastr/build/toastr.min.css";
import toastr from "toastr"
import { NavLink } from 'react-router';

const INITIAL_INPUTS_DATA = {
  order_name: "",
  img_path: "",
  location: "",
  description: "",
  price: "",
  sale: "",
};

export default function OrderForm({ orderId, user }) {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);

  useEffect(() => {
    const getOrder = async () => {
      if (orderId) {
        const data = await OrdersApi.getOne(orderId);
        console.log(data);
        setInputs(data.data);
      }
    };
    getOrder();
  }, []);

  const onChangeHandler = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const filePath = URL.createObjectURL(file);
      setInputs((prev) => ({ ...prev, img_path: filePath }));
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveImage = () => {
    setInputs((prev) => ({ ...prev, img_path: "" })); // Сбрасываем путь к изображению
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (orderId) {
        await OrdersApi.update(orderId, inputs);
        toastr.info("Заказ успешно обновлён!");
        navigate("/page");
      } else {
        const { statusCode, error: responseError } =
          await OrdersApi.createOrder(inputs);
        if (responseError) {
          alert(responseError);
          return;
        }

        if (statusCode === 200) {
          toastr.info("Заказ успешно создан!")
          setInputs(INITIAL_INPUTS_DATA);
          navigate("/page");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };


  const { order_name, img_path, location, description, price, sale } = inputs;
  return (
    <form onSubmit={onSubmitHandler} className="orderPage">
      <input
        type="text"
        name="order_name"
        placeholder="Введите название заказа:"
        autoFocus
        onChange={onChangeHandler}
        value={order_name}
      />
      {/* {
            img_path ? (
                <div className="image-wrapper">
                    <img src={img_path} alt="Uploaded" className="uploaded-image" />
                </div>
            ) : (
            <input
            className='drag-drop-area'
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            type="file"
            />
            )
        } */}
      {/* <div
            className='drag-drop-area'
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            type="file"
        > 
            {img_path ? (

                <div className="image-wrapper">
                    <img src={img_path} alt="Uploaded" className="uploaded-image" />
                </div>
            ) : (
                <p>Перетащите изображение сюда</p>
            )} 
            </div>  */}
      <div
        className="drag-drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {img_path ? (
          <div className="image-wrapper">
            <img src={img_path} alt="Uploaded" className="uploaded-image" />
          </div>
        ) : (
          <>
            <p>Перетащите изображение сюда или выберите файл</p>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="fileInput"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const filePath = URL.createObjectURL(file);
                  setInputs((prev) => ({ ...prev, img_path: filePath }));
                }
              }}
            />
            <label htmlFor="fileInput" className="file-input-label">
              Нажмите здесь, чтобы выбрать файл
            </label>
          </>
        )}
      </div>
      {img_path && (
        <button
          type="button"
          onClick={handleRemoveImage}
          className="remove-button"
        >
          Удалить изображение
        </button>
      )}
      <input
        type="text"
        name="location"
        placeholder="Введите адрес:"
        onChange={onChangeHandler}
        value={location}
      />
      <input
        type="text"
        name="description"
        placeholder="Введите описание:"
        onChange={onChangeHandler}
        value={description}
      />

      <input
        type="number"
        name="price"
        placeholder="Введите цену:"
        onChange={onChangeHandler}
        value={price}
      />

      <input
        type="number"
        name="sale"
        placeholder="Введите цену по скидке:"
        onChange={onChangeHandler}
        value={sale}
      />
      {orderId ? (
        <button className="button" type="submit">
          Обновить
        </button>
      ): (
          <button className="button" type="submit">
            Создать
        </button>
      )}
    </form>
  );
}
