import { useCallback, useRef } from "react";

const useModal = () => {
  // eslint-disable-next-line no-undef
  const ref: React.MutableRefObject<HTMLDialogElement | null> = useRef(null);

  // NOTE: dialog の表示
  const showModal = useCallback(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, []);

  // NOTE: dialog の非表示
  const closeModal = useCallback(() => {
    if (ref.current) {
      ref.current.close();
    }
  }, []);

  return { ref, showModal, closeModal };
};

export default useModal;
