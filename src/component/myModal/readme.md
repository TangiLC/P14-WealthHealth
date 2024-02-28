const MyModal = ({
modalStyle,
modalTitle,
titleStyle,
modalMessage,
messageStyle,
isModalOpen,
closeModal,
})

const [isModalOpen, setIsModalOpen] = useState(false);
const handleCloseModal = () => {
setIsModalOpen(false);
};
