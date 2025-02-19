package es.uvigo.esei.daa.entities;

import static java.util.Objects.requireNonNull;

/**
 * An entity that represents a pet
 * 
 * @author Ismael
 */
public class Pet {
    private int id;    
    private String name;
    private Species specie;
    private String breed;
    private int owner_id;

    //Constructor needed for the JSON conversion
    Pet() {}

    /** */      
    public Pet(int id, String name, Species specie, String breed, int owner_id) {
        this.id = id;

    }

    /**
     * Returns the identifier of the pet
     * 
     * @return the identifier of the pet
     */
    public int getId() {
        return id;
    }

    /**
     * Returns the name of the pet
     * 
     * @return the name of the pet
     */
    public String getName() {
        return name;
    }

    /**
     * Set the name of this name
     * 
     * @param name the new name of the pet
     * @throws NullPointerException if the {@code name} is {@code null}
     */
    public void setName(String name) {
        this.name = requireNonNull(name, "Name can't be null");
    }

    /**
     * Return the specie of the pet
     * 
     * @return the specie of the pet
     */
    public Species getSpecies() {
        return specie;
    }

    /**
     * Set the specie of this pet
     * 
     * @param specie the new specie of the pet
     */
    public void setSpecies(Species specie) {
        this.specie = requireNonNull(specie, "Specie can't be null");
    }

    /**
     * Returns the breed of the pet
     * 
     * @return the breed of the pet
     */
    public String getBreed() {
        return breed;
    }

    /**
     * Set the breed of this pet
     * 
     * @param breed the new breed ot the pet
     */
    public void setBreed(String breed) {
        this.breed = breed;
    }

    /**
     * Returns the id of the pet owner
     * 
     * @return the id of the pet owner
     */
    public int getOwnerId() {
        return owner_id;
    }

    /** */
    public void setOwnerId(int owner_id) {
        this.owner_id = requireNonNull(owner_id, "Owner id can't be null");
    }

}
