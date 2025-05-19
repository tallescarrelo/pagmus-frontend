import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../redux/reducers/userReducer";
import UserServices from "../services/api/user";
import { Button, Modal, Form } from "react-bootstrap";

const ViewProfileLayer = ({ user }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(
    user?.user_img || "assets/images/user-grid/user-grid-img13.png"
  );
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    department: "Design",
    designation: "Designer UI/UX",
    language: "Português",
    description:
      "Sou responsável pela criação de interfaces intuitivas e experiências de usuário centradas no cliente.",
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserServices.updateUser(formData);
      dispatch(setUser(response));
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar o perfil");
    }
  };

  const readURL = (input) => {
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(input.target.files[0]);
    }
  };

  return (
    <div className="row gy-4">
      <div className="col-lg-4">
        <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
          <img
            src="assets/images/user-grid/user-grid-bg1.png"
            alt=""
            className="w-100 object-fit-cover"
          />
          <div className="pb-24 ms-16 mb-24 me-16  mt--100">
            <div className="text-center border border-top-0 border-start-0 border-end-0">
              <img
                src="assets/images/user-grid/user-grid-img14.png"
                alt=""
                className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"
              />
              <h6 className="mb-0 mt-16">{user?.name}</h6>
              <span className="text-secondary-light mb-16">{user?.email}</span>
            </div>
            <div className="mt-24">
              <h6 className="text-xl mb-16">Informações Pessoais</h6>
              <ul>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">Nome completo</span>
                  <span className="w-70 text-secondary-light fw-medium">: {user?.name}</span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">E-mail</span>
                  <span className="w-70 text-secondary-light fw-medium">: {user?.email}</span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">Telefone</span>
                  <span className="w-70 text-secondary-light fw-medium">: {user?.phone}</span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">Departamento</span>
                  <span className="w-70 text-secondary-light fw-medium">: Design</span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">Cargo</span>
                  <span className="w-70 text-secondary-light fw-medium">: Designer UI/UX</span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">Idioma</span>
                  <span className="w-70 text-secondary-light fw-medium">: Português</span>
                </li>
                <li className="d-flex align-items-start gap-1">
                  <span className="w-30 text-md fw-semibold text-primary-light">Bio</span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : Sou responsável pela criação de interfaces intuitivas e experiências de usuário centradas no cliente.
                  </span>
                </li>
              </ul>
              <div className="mt-24 d-flex gap-2">
                <Button variant="outline-primary" onClick={() => setShowPasswordModal(true)}>
                  Alterar senha
                </Button>
                <Button variant="outline-secondary" onClick={() => setShowNotificationModal(true)}>
                  Notificações
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-8">
        <div className="card h-100">
          <div className="card-body p-24">
            <h5 className="mb-4">Editar Perfil</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <label className="form-label">Nome</label>
                  <input type="text" name="name" className="form-control" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="col-sm-6 mb-3">
                  <label className="form-label">E-mail</label>
                  <input type="email" name="email" className="form-control" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="col-sm-6 mb-3">
                  <label className="form-label">Telefone</label>
                  <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="col-sm-6 mb-3">
                  <label className="form-label">Departamento</label>
                  <input type="text" name="department" className="form-control" value={formData.department} onChange={handleInputChange} />
                </div>
                <div className="col-sm-6 mb-3">
                  <label className="form-label">Cargo</label>
                  <input type="text" name="designation" className="form-control" value={formData.designation} onChange={handleInputChange} />
                </div>
                <div className="col-sm-6 mb-3">
                  <label className="form-label">Idioma</label>
                  <input type="text" name="language" className="form-control" value={formData.language} onChange={handleInputChange} />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Descrição</label>
                  <textarea name="description" className="form-control" rows="4" value={formData.description} onChange={handleInputChange} />
                </div>
              </div>
              <div className="text-end">
                <Button variant="primary" type="submit">Salvar Alterações</Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modais */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Alterar senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nova senha</Form.Label>
            <Form.Control type="password" placeholder="Digite a nova senha" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirmar nova senha</Form.Label>
            <Form.Control type="password" placeholder="Confirme a nova senha" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary">Salvar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showNotificationModal} onHide={() => setShowNotificationModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Configurações de Notificações</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Check type="switch" id="news" label="Notícias da empresa" defaultChecked />
          <Form.Check type="switch" id="push" label="Notificações push" className="mt-3" />
          <Form.Check type="switch" id="email" label="Newsletter semanal" className="mt-3" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNotificationModal(false)}>
            Fechar
          </Button>
          <Button variant="primary">Salvar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewProfileLayer;
