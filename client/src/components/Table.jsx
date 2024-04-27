import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export const Table = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchMerk, setSearchMerk] = useState('')
  const [newProduct, setNewProduct] = useState({
    merk: '',
    type: '',
    stock: '',
    price: '',
    description: ''
  });

  async function fetchData() {
    try {
      setLoading(true)
      let link = `http://localhost:3000/products`;
      if (searchMerk) {
        link += `?searchMerk=${searchMerk}`;
      }
      let { data } = await axios.get(link);
      setData(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function addProduct() {
    try {
      setLoading(true);
      let link = `http://localhost:3000/products`;
      await axios.post(link, newProduct);
      fetchData();
      let modal = document.getElementById('my_modal_1')
      modal.close()
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Produk berhasil ditambahkan!`,
      });
      setNewProduct({
        merk: '',
        type: '',
        stock: 0,
        price: 0,
        description: ''
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function deleteData(id) {
    try {
      setLoading(true);
      let link = `http://localhost:3000/products/${id}`;
      await axios.delete(link);
      fetchData();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Berhasil dihapus!`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchMerk(e.target.value)
  }

  return (
    <>
      <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Add</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah</h3>
          <div>
            <h2>Tambah Produk Baru</h2>
            <input
              type="text"
              className='p-3 text-black border'
              placeholder="Merk"
              required
              name="merk"
              value={newProduct.merk}
              onChange={handleInputChange}
            />
            <input
              type="text"
              required
              placeholder="Type"
              className='p-3 text-black border'
              name="type"
              value={newProduct.type}
              onChange={handleInputChange}
            />
            <input
              type="number"
              required
              placeholder="Stock"
              className='p-3 text-black border'
              name="stock"
              value={newProduct.stock}
              onChange={handleInputChange}
            />
            <input
              type="number"
              required
              placeholder="Price"
              name="price"
              className='p-3 text-black border'
              value={newProduct.price}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              className='p-3 text-black border'
              value={newProduct.description}
              onChange={handleInputChange}
            />
            <button onClick={addProduct} className='btn bg-blue-600 text-white'>Tambah</button>
          </div>
        </div>
      </dialog>
      <div>
        <input
          type="text"
          className='p-3 text-black border'
          placeholder="Search by Merek Produk"
          value={searchMerk}
          onChange={handleSearchChange}
        />
        <button className='btn bg-blue-500 text-white' onClick={fetchData}>Search</button>
      </div>
      {loading ? (
        <div className='flex justify-center items-center '><span className="loading loading-bars loading-md mr-5"></span> Loading...</div>
      ) : (
        <>
          {data.length === 0 ? (
            <div>Data Kosong</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Merek Produk</th>
                    <th>Jenis Produk</th>
                    <th>Jumlah Stok</th>
                    <th>Harga</th>
                    <th>Keterangan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((el) => (
                    <tr key={el.id}>
                      <th>{el.id}</th>
                      <td>{el.merk}</td>
                      <td>{el.type}</td>
                      <td>{el.stock}</td>
                      <td>{el.price}</td>
                      <td>{el.description}</td>
                      <td>
                        <a className='bg-gray-600 btn text-white' href="/edit">Edit</a>
                        <a onClick={() => deleteData(el.id)} className='bg-red-600 btn text-white'>Delete</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

    </>
  )
}
