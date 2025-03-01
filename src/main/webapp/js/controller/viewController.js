var ViewController = (function() {

    var mainContainerId;
    var toggleButtonId;

    var currentView;
    var peopleView;
    var petView;

    function ViewController(containerId, buttonId) {
        //Guardamos los identificadores de los contenedores y botones
        mainContainerId = containerId;
        toggleButtonId = buttonId;

        this.init =  function() {
            //Creamos las vistas
            peopleView = new PeopleView(new PeopleDAO(), mainContainerId);
            petView = new PetView(new PetDAO(), mainContainerId);
            currentView = 'people';
            //Mostramos la vista de personas
            peopleView.init();
        };

        /**
         * Cambia la vista actual entre personas
         * y mascotas.
         */
        this.toggleView = function() {
            if (currentView === 'people') {
                $('#' + mainContainerId).empty();
                petView.init();
                currentView = 'pets';
                $('#' + toggleButtonId).text('Ver personas');
            } else {
                $('#' + mainContainerId).empty();
                peopleView.init();
                currentView = 'people';
                $('#' + toggleButtonId).text('Ver mascotas');
            }
        };
    }

    return ViewController;
})();