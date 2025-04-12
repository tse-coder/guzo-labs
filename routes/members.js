const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Helper function to read members data
const getMembersData = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, '../data/members.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading members data:', error);
        return { members: [] };
    }
};

// GET all members
router.get('/', (req, res) => {
    const data = getMembersData();
    res.render('members', { 
        members: data.members,
        page: 'members'
    });
});

// GET member by ID
router.get('/:id', (req, res) => {
    const data = getMembersData();
    const member = data.members.find(m => m.id === req.params.id);
    
    if (!member) {
        return res.status(404).json({ error: 'Member not found' });
    }
    
    res.json(member);
});

// POST new member
router.post('/', (req, res) => {
    const data = getMembersData();
    const newMember = req.body;
    
    // Generate new ID
    const lastId = data.members.length > 0 
        ? parseInt(data.members[data.members.length - 1].id.substring(1)) 
        : 0;
    newMember.id = `M${String(lastId + 1).padStart(3, '0')}`;
    
    data.members.push(newMember);
    
    try {
        fs.writeFileSync(
            path.join(__dirname, '../data/members.json'),
            JSON.stringify(data, null, 2)
        );
        res.status(201).json(newMember);
    } catch (error) {
        console.error('Error saving member:', error);
        res.status(500).json({ error: 'Error saving member' });
    }
});

// PUT update member
router.put('/:id', (req, res) => {
    const data = getMembersData();
    const index = data.members.findIndex(m => m.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Member not found' });
    }
    
    data.members[index] = { ...data.members[index], ...req.body };
    
    try {
        fs.writeFileSync(
            path.join(__dirname, '../data/members.json'),
            JSON.stringify(data, null, 2)
        );
        res.json(data.members[index]);
    } catch (error) {
        console.error('Error updating member:', error);
        res.status(500).json({ error: 'Error updating member' });
    }
});

// DELETE member
router.delete('/:id', (req, res) => {
    const data = getMembersData();
    const index = data.members.findIndex(m => m.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Member not found' });
    }
    
    data.members.splice(index, 1);
    
    try {
        fs.writeFileSync(
            path.join(__dirname, '../data/members.json'),
            JSON.stringify(data, null, 2)
        );
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting member:', error);
        res.status(500).json({ error: 'Error deleting member' });
    }
});

module.exports = router; 