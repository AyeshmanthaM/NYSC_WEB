#!/bin/bash

# NYSC MySQL Installation and Setup Script
# Run this script to install MySQL and set up the database

echo "🔧 NYSC MySQL Installation & Setup Script"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running on WSL
if grep -qEi "(Microsoft|WSL)" /proc/version &> /dev/null ; then
    print_status "Running on Windows Subsystem for Linux (WSL)"
else
    print_status "Running on native Linux"
fi

# Step 1: Update package repositories
print_status "Updating package repositories..."
sudo apt update

if [ $? -eq 0 ]; then
    print_status "Package repositories updated successfully"
else
    print_error "Failed to update package repositories"
    exit 1
fi

# Step 2: Install MySQL Server
print_status "Installing MySQL Server..."
sudo apt install mysql-server -y

if [ $? -eq 0 ]; then
    print_status "MySQL Server installed successfully"
else
    print_error "Failed to install MySQL Server"
    exit 1
fi

# Step 3: Start MySQL service
print_status "Starting MySQL service..."
sudo systemctl start mysql
sudo systemctl enable mysql

# Check if MySQL is running
if sudo systemctl is-active --quiet mysql; then
    print_status "MySQL service is running"
else
    print_warning "MySQL service is not running, attempting to start..."
    sudo systemctl start mysql
fi

# Step 4: Check MySQL installation
print_status "Checking MySQL installation..."
mysql --version

# Step 5: Create database and user
print_status "Setting up NYSC database and user..."

# Create a temporary SQL file
TEMP_SQL="/tmp/nysc_setup.sql"
cat > "$TEMP_SQL" << EOF
-- NYSC Database Setup
CREATE DATABASE IF NOT EXISTS nysc_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'nysc_user'@'localhost' IDENTIFIED BY 'SecureNyscPassword123!';
GRANT ALL PRIVILEGES ON nysc_db.* TO 'nysc_user'@'localhost';
FLUSH PRIVILEGES;

-- Test the setup
USE nysc_db;
SELECT 'NYSC Database setup completed successfully!' as Status;
EOF

# Run the SQL script
print_status "Creating database and user..."
sudo mysql -u root < "$TEMP_SQL"

if [ $? -eq 0 ]; then
    print_status "Database and user created successfully"
else
    print_error "Failed to create database and user"
    print_warning "You may need to run mysql_secure_installation first"
fi

# Clean up temporary file
rm "$TEMP_SQL"

# Step 6: Test database connection
print_status "Testing database connection..."
mysql -u nysc_user -p'SecureNyscPassword123!' -e "USE nysc_db; SELECT 'Connection successful!' as Status;" 2>/dev/null

if [ $? -eq 0 ]; then
    print_status "Database connection test successful"
else
    print_warning "Database connection test failed - you may need to configure MySQL manually"
fi

# Step 7: Install Redis (optional but recommended)
print_status "Installing Redis (required for sessions)..."
sudo apt install redis-server -y

if [ $? -eq 0 ]; then
    print_status "Redis installed successfully"
    sudo systemctl start redis-server
    sudo systemctl enable redis-server
else
    print_warning "Redis installation failed - sessions may not work properly"
fi

# Step 8: Copy environment file
if [ -f "/home/ayesh/NYSC_WEB/backend/.env.new" ]; then
    print_status "Copying environment configuration..."
    cp /home/ayesh/NYSC_WEB/backend/.env.new /home/ayesh/NYSC_WEB/backend/.env
    print_status "Environment file updated with database credentials"
else
    print_warning "Environment file not found - please configure manually"
fi

# Final instructions
echo ""
echo "🎉 Installation Complete!"
echo "========================"
echo ""
echo "Next Steps:"
echo "1. Navigate to your backend directory:"
echo "   cd /home/ayesh/NYSC_WEB/backend"
echo ""
echo "2. Install Node.js dependencies:"
echo "   npm install"
echo ""
echo "3. Run database migrations:"
echo "   npx prisma migrate dev"
echo ""
echo "4. Seed the database:"
echo "   npx prisma db seed"
echo ""
echo "5. Start the development server:"
echo "   npm run dev"
echo ""
echo "Database Credentials:"
echo "- Host: localhost"
echo "- Port: 3306"
echo "- Database: nysc_db"
echo "- Username: nysc_user"
echo "- Password: SecureNyscPassword123!"
echo ""
echo "Admin Panel URL: http://localhost:5000/admin"
echo ""

# Check if we should run mysql_secure_installation
echo "🔒 Security Recommendation:"
echo "Run 'sudo mysql_secure_installation' to secure your MySQL installation"
echo ""

print_status "Setup script completed!"