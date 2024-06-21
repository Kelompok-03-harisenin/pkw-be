'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Seed Users
      const usersResult = await queryInterface.bulkInsert('Users', [
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          biography: 'Some bio',
          title: 'Photographer',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          password: 'password123',
          biography: 'Some bio',
          title: 'Photographer',
          createdAt: new Date(),
          updatedAt: new Date()
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
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category_name: 'Technology',
          id_category: 'CAT002',
          createdAt: new Date(),
          updatedAt: new Date()
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
          id_user: userIds[0],
          categoryId: categoryIds[0],
          photo_url: 'http://example.com/photo1.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id_user: userIds[1],
          categoryId: categoryIds[1],
          photo_url: 'http://example.com/photo2.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], { returning: true });

      // Seed Comments
      await queryInterface.bulkInsert('Comments', [
        {
          id_photo: photos[0].id,
          id_user: userIds[1],
          comment: 'Beautiful photo!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id_photo: photos[1].id,
          id_user: userIds[0],
          comment: 'Amazing technology!',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});

      // Seed Likes
      await queryInterface.bulkInsert('Likes', [
        {
          id_photo: photos[0].id,
          id_user: userIds[1],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id_photo: photos[1].id,
          id_user: userIds[0],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});

    } catch (error) {
      console.error('Error seeding data:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Reverse the seeding process
    await queryInterface.bulkDelete('Likes', null, {});
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Photos', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
