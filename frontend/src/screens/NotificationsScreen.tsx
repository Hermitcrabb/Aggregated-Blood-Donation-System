import React from "react";
import { ScreenContainer } from "@components/ScreenContainer";
import { SectionHeader } from "@components/SectionHeader";
import { NotificationItem } from "@components/NotificationItem";
import { useDataContext } from "@context/DataContext";
import { EmptyState } from "@components/EmptyState";

export const NotificationsScreen: React.FC = () => {
  const { notifications } = useDataContext();

  return (
    <ScreenContainer>
      <SectionHeader title="Notifications" />
      {notifications.length === 0 ? (
        <EmptyState title="No notifications" description="You are up to date."
        />
      ) : (
        notifications.map((notification) => <NotificationItem key={notification.id} notification={notification} />)
      )}
    </ScreenContainer>
  );
};
