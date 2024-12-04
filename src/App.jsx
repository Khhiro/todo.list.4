import React, { useState } from "react";
import {
  Container,
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    photo: "",
    email: "",
    status: "",
    city: "",
  });
  const [editUser, setEditUser] = useState(null);

  const handleAddUser = () => {
    if (editUser) {
      setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
      setEditUser(null);
    } else {
      setUsers([...users, { ...newUser, id: Date.now() }]);
    }
    setNewUser({ name: "", photo: "", email: "", status: "", city: "" });
    setDialogOpen(false);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? user.status === statusFilter : true)
  );

  return (
    <Container>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField
          label="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          sx={{ flex: 1, mr: 2 }}
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          displayEmpty
          variant="outlined"
          sx={{ flex: 0.5, mr: 2 }}
        >
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setDialogOpen(true)}
          sx={{ backgroundColor: "#1976d2", color: "#fff" }}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 4, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Photo</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <img
                    src={user.photo}
                    alt={user.name}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEdit(user)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Name"
              value={editUser ? editUser.name : newUser.name}
              onChange={(e) =>
                editUser
                  ? setEditUser({ ...editUser, name: e.target.value })
                  : setNewUser({ ...newUser, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Photo URL"
              value={editUser ? editUser.photo : newUser.photo}
              onChange={(e) =>
                editUser
                  ? setEditUser({ ...editUser, photo: e.target.value })
                  : setNewUser({ ...newUser, photo: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Email"
              value={editUser ? editUser.email : newUser.email}
              onChange={(e) =>
                editUser
                  ? setEditUser({ ...editUser, email: e.target.value })
                  : setNewUser({ ...newUser, email: e.target.value })
              }
              fullWidth
            />
            <Select
              value={editUser ? editUser.status : newUser.status}
              onChange={(e) =>
                editUser
                  ? setEditUser({ ...editUser, status: e.target.value })
                  : setNewUser({ ...newUser, status: e.target.value })
              }
              fullWidth
              displayEmpty
            >
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
            <TextField
              label="City"
              value={editUser ? editUser.city : newUser.city}
              onChange={(e) =>
                editUser
                  ? setEditUser({ ...editUser, city: e.target.value })
                  : setNewUser({ ...newUser, city: e.target.value })
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddUser}
            sx={{ backgroundColor: "#1976d2", color: "#fff" }}
          >
            {editUser ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
