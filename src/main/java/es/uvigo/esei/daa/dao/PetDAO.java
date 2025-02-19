package es.uvigo.esei.daa.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import es.uvigo.esei.daa.entities.Pet;
import es.uvigo.esei.daa.entities.Species;

/**
 * Returns a pet stored persisted in the system.
 * 
 * @param id identifier of the pet.
 * @return a pet with the provided identifier.
 * @throws DAOException if an error happens while retrieving the pet.
 * @throws IllegalArgumentException if the provided id does not corresponds
 * with any persisted pet.
 */
public class PetDAO extends DAO {
    private final static Logger LOG = Logger.getLogger(PetDAO.class.getName());

    public Pet get(int id) 
    throws DAOException, IllegalArgumentException{
        try (final Connection conn = this.getConnection()) {
            final String query = "SELECT * FROM pets WHERE id=?";

            try (final PreparedStatement statement = conn.prepareStatement(query)) {
                statement.setInt(1, id);

                try (final ResultSet result = statement.executeQuery()) {
                    if (result.next()) {
                        return rowToEntity(result);
                    } else {
                        throw new IllegalArgumentException("Invalid id");
                    }
                }
            }
        } catch (SQLException e) {
            LOG.log(Level.SEVERE, "Error getting a pet", e);
            throw new DAOException(e);
        }
    }

    /**
     * Returns a list with all the pets persisted in the system.
     * 
     * @return a list with all the pets persisted in the system.
     * @throws DAOException if an error happens while retrieving the pets.
     */
    public List<Pet> list() throws DAOException {
        try (final Connection conn = this.getConnection()) {
            final String query = "SELECT * FROM pets";
        
            try (final PreparedStatement statement = conn.prepareStatement(query)) {
                try (final ResultSet result = statement.executeQuery()) {
                    final List<Pet> pets = new LinkedList<>();
                    while (result.next()) {
                        pets.add(rowToEntity(result));
                    }

                    return pets;
                }
            }
        } catch (SQLException e) {
            LOG.log(Level.SEVERE, "Error listing pets", e);
            throw new DAOException(e);
        }
    }

    /**
     * Persist a new pet in the system. The pet must have a valid owner.
     * An identifier will be assigned automatically to the new pet.
     * 
     * @param 
     * @return
     * @throws SQLException
     */
    public Pet add(String name, Species specie, String breed, int owner_id)
    throws DAOException, IllegalArgumentException {
        if (name == null || specie == null ) {
            throw new IllegalArgumentException("Name and specie can't be null");
        }

        try (Connection conn = this.getConnection()) {
            final String query = "INSERT INTO pets (pet_id, name, specie, breed, owner_id) VALUES (null, ?, ?, ?, ?)";

            try (PreparedStatement statement = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
                statement.setString(1, name);
                statement.setString(2, specie);
                statement.setString(3, breed);
                statement.setString(4, owner_id);

            }
        }

    }


    private Pet rowToEntity(ResultSet row) throws SQLException{
        return new Pet(
            row.getInt("id_pet"),
            row.getString("name"),
            Species.valueOf(row.getString("specie")),
            row.getString("breed"),
            row.getInt("owner_id")
        );
    }

}
