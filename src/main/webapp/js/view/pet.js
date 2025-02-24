var PetView = (function(){
    var dao;

    var self;

    var formId = 'pet-form';
    var listId = 'pet-list';
    var formQuery = '#' + formId;
    var listQuery = '#' + listId;

    function PetView(petDao, formContainerId, listContainerId) {
        dao = petDao;
        self = this;

        insertPetForm($('#' + formContainerId));
        insertPetList($('#' + listContainerId));

        this.init = function() {
            dao.listPets(function(pets){
                $.each(pets, function(key, pet) {
                    appendToTable(pet);
                });
            },
            function() {
                alert('No ha sido posible acceder al listado de mascotas.');
            });

            $(formQuery).submit(function(event) {
                var pet = self.getPetInForm();

                if (self.isEditing()) {
                    dao.modifyPet(pet,
                        function(pet) {
                            $('#pet-' + pet.id + ' td.name').text(pet.name);
                            $('#pet-' + pet.id + ' td.name').text(pet.specie);
                            $('#pet-' + pet.id + ' td.name').text(pet.breed);
                            $('#pet-' + pet.id + ' td.name').text(pet.owner_id);
                            self.resetForm();
                        },
                        showErrorMessage,
                        self.enableForm
                    );
                } else {
                    dao.addPet(pet,
                        function(pet) {
                            appendToTable(pet);
                            self.resetForm();
                        },
                        showErrorMessage,
                        self.enableForm
                    );
                }

                return false;
            });

            $('btnClear').click(this.resetForm);
        };

        this.getPetInForm = function() {
            var form = $(formQuery);
            return {
                'id' : form.find('input[name="id"]').val(),
                'name' : form.find('input[name="name"]').val(),
                'specie' : form.find('input[name="specie"]').val(),
                'breed' : form.find('input[name="breed"]').val(),
                'owner_id' : form.find('input[name="owner_id"]').val()
            }
        };

        this.getPetInRow = function(id) {
            var row = $('#pet-' + id);

            if (row !== undefined) {
                return {
                    'id' : id,
                    'name' : row.find('td.name').text(),
                    'specie' : row.find('td.specie').text(),
                    'breed' : row.find('td.breed').text(),
                    'owner_id' : row.find('td.owner_id').text()
                };
            } else {
                return undefined;
            }
        };

        this.editPet = function(id) {
            var row = $('#pet-' + id);

            if (row !== undefined) {
                var form = $(formQuery);

                form.find('input[name="id"]').val(id);
                form.find('input[name="name"]').val(row.find('td.name').text());
                form.find('input[name="specie"]').val(row.find('td.specie').text());
                form.find('input[name="breed"]').val(row.find('td.breed').text());
                form.find('input[name="owner_id"]').val(row.find('td.owner_id').text());

                $('input#btnSubmit').val('Modificar');
            }
        };

        this.deletePet = function(id) {
            if (confirm('Esta a punto de eliminar a una mascota. ¿Está seguro de que desea continuar?')) {
                dao.deletePet(id,
                    function() {
                        $('tr#pet-' + id).remove();
                    },
                    showErrorMessage
                );
            }
        };

        this.isEditing = function() {
            return $(formQuery + ' input[name="id"]').val() != "";
        };

        this.enableForm = function() {
            $(formQuery + ' input').prop('disabled', false);
        };

        this.disableForm = function() {
            $(formQuery + ' input').prop('disabled', true);
        };

        this.resetForm = function() {
            $(formQuery)[0].reset();
            $(formQuery + ' input[name="id"]').val('');
            $('#btnSubmit').val('Crear');   
        };
    };

    var insertPetForm = function(parent) {
        parent.append(
            '<form id="' + formId + '" class="mb-5 mb-10">\
            <input name="id" type="hidden" value=""/>\
            <div class="row">\
                <div class="col-sm-3">\
                    <input name="name" type="text" value="" placeholder="Nombre" class="form-control" required/>\
                </div>\
                <div class="col-sm-2">\
                    <input name="specie" type="text" value="" placeholder="Especie" class="form-control" required/>\
                </div>\
                <div class="col-sm-3">\
                    <input name="breed" type="text" value="" placeholder="Raza" class="form-control"/>\
                </div>\
                <div class="col-sm-2">\
                    <input name="owner_id" type="number" value="" placeholder="Id Dueño" class="form-control" required/>\
                </div>\
                <div class="col-sm-2">\
                    <input id="btnSubmit" type="submit" value="Crear" class="btn btn-primary"/>\
                    <input id="btnClear" type="reset" value="Limpiar" class="btn"/>\
                <div>\
            </div>\
            </form>'
        );
    };

    var insertPetList = function(parent) {
        parent.append(
            '<table id="' + listId + '" class="table">\
            <thead>\
                <tr class="row">\
                    <th class="col-sm-3">Nombre</th>\
                    <th class="col-sm-2">Especie</th>\
                    <th class="col-sm-3">Raza</th>\
                    <th class="col-sm-2">Id Dueño</th>\
                    <th class="col-sm-2">&nbsp;</th>\
                </tr>\
            </thead>\
            <tbody>\
            </tbody>\
            </table>'
        );
    };

    var appendToTable = function(pet) {
        $(listQuery + ' > tbody:last').append(createPetRow(pet));
        addRowListeners(pet);
    };

    var createPetRow = function(pet) {
        return '<tr id="pet-' + pet.id +'" class="row">\
            <td class="name col-sm-3">' + pet.name + '</td>\
            <td class="specie col-sm-2">' + pet.species + '</td>\
            <td class="breed col-sm-3">' + pet.breed + '</td>\
            <td class="owner_id col-sm-2">' + pet.ownerId + '</td>\
            <td class="col-sm-2">\
                <a class="edit btn btn-primary" href="#">Editar</a>\
                <a class="delete btn btn-warning" href="#">Eliminar</a>\
            </td>\
            </tr>';
    };

    var addRowListeners = function(pet) {
        $('#pet-' + pet.id + ' a.edit').click(function() {
            self.editPet(pet.id);
        });

        $('#pet-' + pet.id + ' a.delete').click(function() {
            self.deletePet(pet.id);
        });
    };

    var showErrorMessage = function(jqxhr, textStatus, error) {
        alert(textStatus + ": " + error);
    };

    return PetView;
})();