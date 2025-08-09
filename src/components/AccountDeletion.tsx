import React from 'react';

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
    },
    content: {
        padding: '20px 0',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center' as const,
        marginBottom: '0.5rem',
        color: '#333',
    },
    subtitle: {
        fontSize: '1.5rem',
        textAlign: 'center' as const,
        marginBottom: '0.5rem',
        color: '#666',
        fontWeight: 'normal',
    },
    lastUpdated: {
        fontSize: '0.9rem',
        textAlign: 'center' as const,
        marginBottom: '2rem',
        color: '#888',
        fontStyle: 'italic',
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#333',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '0.5rem',
    },
    text: {
        fontSize: '0.95rem',
        lineHeight: '1.6',
        marginBottom: '1rem',
        color: '#555',
    },
    textP: {
        margin: '0.5rem 0',
    },
    button: {
        display: 'block',
        width: '100%',
        maxWidth: '300px',
        margin: '2rem auto',
        padding: '12px 24px',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        textAlign: 'center' as const,
        textDecoration: 'none',
        transition: 'background-color 0.2s',
    },
    warning: {
        backgroundColor: '#fef2f2',
        borderLeft: '4px solid #ef4444',
        padding: '1rem',
        margin: '1.5rem 0',
        borderRadius: '4px',
        color: '#991b1b',
    },
    listItem: {
        marginBottom: '0.5rem',
    },
};

export const AccountDeletion: React.FC = () => {
    const handleDeleteAccount = () => {
        // In a real implementation, this would trigger the account deletion flow
        window.location.href = 'mailto:jared@pypes.dev?subject=Account%20Deletion%20Request&body=Please%20delete%20my%20account%20and%20all%20associated%20data.';
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.title}>Account Deletion</h1>
                <h2 style={styles.subtitle}>Pypes</h2>
                <p style={styles.lastUpdated}>Last Updated: August 8, 2025</p>

                <h3 style={styles.sectionTitle}>Requesting Account Deletion</h3>
                <div style={styles.text}>
                    <p style={styles.textP}>
                        At Pypes, we respect your right to control your personal data. You can request the deletion of your account and all associated data at any time.
                    </p>

                    <div style={styles.warning}>
                        <strong>Warning:</strong> Account deletion is permanent and cannot be undone. All your data will be permanently removed from our systems.
                    </div>

                    <p style={styles.textP}>
                        Alternatively, you can request account deletion by emailing us at <strong>jared@pypes.dev</strong> with the subject line "Account Deletion Request" from the email address associated with your account.
                    </p>

                    <button
                        style={styles.button}
                        onClick={handleDeleteAccount}
                        aria-label="Request Account Deletion"
                    >
                        Request Account Deletion
                    </button>
                </div>

                <h3 style={styles.sectionTitle}>What Happens When You Delete Your Account</h3>
                <div style={styles.text}>
                    <h4 style={{ ...styles.sectionTitle, fontSize: '1.1rem' }}>Data That Will Be Deleted</h4>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li style={styles.listItem}>Your account information (name, email, username)</li>
                        <li style={styles.listItem}>Profile information and preferences</li>
                        <li style={styles.listItem}>Workout history and exercise data</li>
                        <li style={styles.listItem}>Nutrition tracking data</li>
                        <li style={styles.listItem}>Progress photos and measurements</li>
                        <li style={styles.listItem}>Custom workout plans and saved routines</li>
                        <li style={styles.listItem}>Subscription and payment information</li>
                    </ul>

                    <h4 style={{ ...styles.sectionTitle, fontSize: '1.1rem', marginTop: '1.5rem' }}>Data Retention Period</h4>
                    <p style={styles.textP}>
                        We will process your deletion request immediately. However, please note that:
                    </p>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li style={styles.listItem}>Your data will be permanently deleted from our active databases within 30 days.</li>
                        <li style={styles.listItem}>Backup copies of your data may be retained for up to 90 days in our secure backup systems before being permanently deleted.</li>
                        <li style={styles.listItem}>Some anonymized or aggregated data that cannot be associated with your identity may be retained for analytics purposes.</li>
                    </ul>

                    <h4 style={{ ...styles.sectionTitle, fontSize: '1.1rem', marginTop: '1.5rem' }}>Data That May Be Retained</h4>
                    <p style={styles.textP}>
                        In certain circumstances, we may be required to retain certain information for legal or legitimate business purposes, including:
                    </p>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li style={styles.listItem}>Records of financial transactions as required by accounting and tax laws</li>
                        <li style={styles.listItem}>Information related to active investigations or legal claims</li>
                        <li style={styles.listItem}>Data that has been fully anonymized and cannot be used to identify you</li>
                    </ul>
                </div>

                <h3 style={styles.sectionTitle}>After Account Deletion</h3>
                <div style={styles.text}>
                    <p style={styles.textP}>
                        Once your account is deleted, you will no longer have access to any of your data in the Pypes app. If you wish to use our services again in the future, you will need to create a new account.
                    </p>
                    <p style={styles.textP}>
                        If you have an active subscription, please cancel it through the appropriate app store before deleting your account to avoid being charged for another billing cycle.
                    </p>
                </div>

                <h3 style={styles.sectionTitle}>Need Help?</h3>
                <div style={styles.text}>
                    <p style={styles.textP}>
                        If you have any questions about account deletion or need assistance, please contact our support team at <strong>jared@pypes.dev</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AccountDeletion;
