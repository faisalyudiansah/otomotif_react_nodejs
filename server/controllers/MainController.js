const { Product, Sequelize } = require("../models")
const { Op } = require('sequelize');
class MainController {
    static async getAll(req, res, next) {
        try {
            let { searchMerk } = req.query
            let data;
            if (searchMerk) {
                data = await Product.findAll({
                    where: {
                        merk: {
                            [Op.iLike]: `%${searchMerk}%`
                        }
                    }
                })
            } else {
                data = await Product.findAll()
            }
            if (data.length === 0) {
                throw { name: "Cannot found a product" }
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            let { merk, type, stock, price, description } = req.body
            if (!merk || !type || !stock || !price) {
                throw { name: 'Your input is invalid' }
            }
            let data = await Product.create({ merk, type, stock, price, description })
            res.status(201).json({
                message: "Products has been created",
                data: {
                    id: data.id,
                    merk,
                    type,
                    stock,
                    price,
                    description
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            let { merk, type, stock, price, description } = req.body
            let findProduct = await Product.findByPk(req.params.idProduct)
            if (!findProduct) {
                throw { name: 'Cannot found a product' }
            }
            await findProduct.update({ merk, type, stock, price, description })
            res.status(200).json({
                message: "Products has been updated",
                data: {
                    id: findProduct.id,
                    merk,
                    type,
                    stock,
                    price,
                    description
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            let product = await Product.findByPk(req.params.idProduct)
            if (!product) {
                throw { name: "Cannot found a product" }
            } else {
                await product.destroy()
                res.status(200).json({ message: `Product success to delete` })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MainController