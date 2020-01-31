const express = require('express');

let { verificarToken, verificarAdminRole } = require('../middlewares/auntenticacion');

let app = express();

let Categoria = require('../models/categoria');




// ===================================
// Mostrar todas las categorias 
// ===================================
app.get('/categoria', verificarToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            });
        });

});


// ===================================
// Mostrar una categoria por ID
// ===================================
app.get('/categoria/:id', verificarToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El id es inválido'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    })

});


// ===================================
// Crear nueva categoria 
// ===================================
app.post('/categoria', verificarToken, (req, res) => {
    // Regresa la nueva categoria
    // req.usuario._id

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });


});


// ===================================
// Modifica una categoria
// ===================================
app.put('/categoria/:id', verificarToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            categoria: categoriaDB
        })
    });



});



// ===================================
// Elimina una categoria 
// ===================================
app.delete('/categoria/:id', [verificarToken, verificarAdminRole], (req, res) => {
    // Solo un administrador puede borrar categorias
    // Categoria.findByIdAndRemove();

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }


        res.json({
            ok: true,
            message: 'Categoria borrada'
        })
    });

});








module.exports = app;