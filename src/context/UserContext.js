import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Start with null - user not logged in. Will be populated on login
  const [user, setUser] = useState(null);

  const updateUser = (updates) => {
    if (user) {
      setUser(prev => ({ ...prev, ...updates }));
    }
  };

  const updateStats = (stats) => {
    if (user) {
      setUser(prev => ({
        ...prev,
        stats: { ...prev.stats, ...stats }
      }));
    }
  };

  const updatePreferences = (prefs) => {
    if (user) {
      setUser(prev => ({
        ...prev,
        preferences: { ...prev.preferences, ...prefs }
      }));
    }
  };

  const unlockAchievement = (achievementId) => {
    if (user) {
      setUser(prev => ({
        ...prev,
        achievements: prev.achievements.map(ach =>
          ach.id === achievementId ? { ...ach, unlocked: true } : ach
        )
      }));
    }
  };

  const loginUser = (userData) => {
    // Called when user logs in - populate with real data
    const defaultCollections = [
      {
        id: 'col_1',
        name: 'Smoking Essentials',
        description: 'My favorite smoking gear and wood types',
        icon: '🔥',
        color: '#D05E41',
        items: [],
        createdAt: new Date().toISOString(),
      },
      {
        id: 'col_2',
        name: 'Beef Recipes',
        description: 'Best beef rubs and marinades',
        icon: '🥩',
        color: '#EB813B',
        items: [],
        createdAt: new Date().toISOString(),
      },
      {
        id: 'col_3',
        name: 'Summer Favorites',
        description: 'Quick weekend grilling items',
        icon: '☀️',
        color: '#865E47',
        items: [],
        createdAt: new Date().toISOString(),
      },
    ];

    setUser({
      ...userData,
      collections: userData.collections || defaultCollections,
    });
  };

  const addCollection = (collection) => {
    if (user) {
      const newCollection = {
        id: 'col_' + Date.now(),
        createdAt: new Date().toISOString(),
        items: [],
        ...collection,
      };
      setUser(prev => ({
        ...prev,
        collections: [...(prev.collections || []), newCollection],
      }));
      return newCollection;
    }
  };

  const updateCollection = (collectionId, updates) => {
    if (user) {
      setUser(prev => ({
        ...prev,
        collections: prev.collections.map(col =>
          col.id === collectionId ? { ...col, ...updates } : col
        ),
      }));
    }
  };

  const deleteCollection = (collectionId) => {
    if (user) {
      setUser(prev => ({
        ...prev,
        collections: prev.collections.filter(col => col.id !== collectionId),
      }));
    }
  };

  const addItemToCollection = (collectionId, item) => {
    if (user) {
      setUser(prev => ({
        ...prev,
        collections: prev.collections.map(col => {
          if (col.id === collectionId) {
            return {
              ...col,
              items: [...(col.items || []), { ...item, addedAt: new Date().toISOString() }],
            };
          }
          return col;
        }),
      }));
    }
  };

  const removeItemFromCollection = (collectionId, itemId) => {
    if (user) {
      setUser(prev => ({
        ...prev,
        collections: prev.collections.map(col => {
          if (col.id === collectionId) {
            return {
              ...col,
              items: col.items.filter(item => item.id !== itemId),
            };
          }
          return col;
        }),
      }));
    }
  };

  const logoutUser = () => {
    // Clear user data on logout
    setUser(null);
  };

  return (
    <UserContext.Provider value={{
      user,
      updateUser,
      updateStats,
      updatePreferences,
      unlockAchievement,
      loginUser,
      logoutUser,
      addCollection,
      updateCollection,
      deleteCollection,
      addItemToCollection,
      removeItemFromCollection,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
