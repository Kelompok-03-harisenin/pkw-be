'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Seed Users
      const usersResult = await queryInterface.bulkInsert('Users', [
        {
          id: 90,
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          biography: 'Some bio',
          title: 'Photographer',
        },
        {
          id: 91,
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          password: 'password123',
          biography: 'Some bio',
          title: 'Photographer',
        }
      ], { returning: true });

      if (!Array.isArray(usersResult) || usersResult.length === 0) {
        throw new Error('Failed to insert users or unexpected result format.');
      }

      // Extract inserted user IDs
      const userIds = usersResult.map(user => user.id);

      // Seed Categories
      const categoriesResult = await queryInterface.bulkInsert('Categories', [
        {
          
          category_name: 'Nature',
          id_category: 'CAT001',
        },
        {
          category_name: 'Technology',
          id_category: 'CAT002',
        },
        {
          category_name: 'Art',
          id_category: 'CAT003',
        },
        {
          category_name: 'Science',
          id_category: 'CAT004',
        }
      ], { returning: true });

      if (!Array.isArray(categoriesResult) || categoriesResult.length === 0) {
        throw new Error('Failed to insert categories or unexpected result format.');
      }

      // Extract inserted category IDs
      const categoryIds = categoriesResult.map(category => category.id);

      // Seed Photos
      const photos = await queryInterface.bulkInsert('Photos', [
        {
          userId: 90,
          categoryId: categoryIds[0],
          description: 'Beautiful nature scene',
          link_image: 'http://example.com/photo1.jpg',
        },
        {
          userId: 91,
          categoryId: categoryIds[1],
          description: 'Amazing technology gadget',
          link_image: 'http://example.com/photo2.jpg',
        }
      ], { returning: true });

      if (!Array.isArray(photos) || photos.length === 0) {
        throw new Error('Failed to insert photos or unexpected result format.');
      }

      // Extract inserted photo IDs
      const photoIds = photos.map(photo => photo.id);

      // Seed Comments
      await queryInterface.bulkInsert('Comments', [
        {
          id_photo: photoIds[0],
          id_user: userIds[1],
          comment: 'Beautiful photo!',
        },
        {
          id_photo: photoIds[1],
          id_user: userIds[0],
          comment: 'Amazing technology!',
        }
      ], {});

      // Seed Likes
      await queryInterface.bulkInsert('Likes', [
        {
          id_photo: photoIds[0],
          id_user: userIds[1],
        },
        {
          id_photo: photoIds[1],
          id_user: userIds[0],
        }
      ], {});

      console.log('Data has been seeded successfully.');
    } catch (error) {
      console.error('Error seeding data:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Reverse the seeding process
      await queryInterface.bulkDelete('Likes', null, {});
      await queryInterface.bulkDelete('Comments', null, {});
      await queryInterface.bulkDelete('Photos', null, {});
      await queryInterface.bulkDelete('Categories', null, {});
      await queryInterface.bulkDelete('Users', null, {});

      console.log('Data has been deleted successfully.');
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }
};
