interface PendingModalProps {
  visible: boolean;
  status: string;
  message: string;
  onPress: () => void;
  onRefresh: () => void;
  refreshing: boolean;
}
